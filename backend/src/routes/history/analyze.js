const express = require("express");
const router = express.Router();
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const path = require("path");

const isLoggedIn = require("../../middelwear/login.js");
const pool = require("../../connections/DB.connect.js");
const getGeminiResponse = require("../../controllers/gemini.js");
const generatePrompt = require("../../controllers/prompt.js");

const upload = multer({ dest: "uploads/" });

router.get("/", isLoggedIn, async (req, res) => {
  try {
    console.log("get work");
    const userId = req.user.id;

    const query = `
      SELECT 
        h.id AS history_id,
        r.id AS resume_id,
        r.title AS resume_title,
        r.ai_score,
        h.created_at,
        h.action,
        *
      FROM history h
      JOIN resumes r ON h.resume_id = r.id
      WHERE h.user_id = $1
      ORDER BY h.created_at DESC
    `;

    const result = await pool.query(query, [userId]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching analyze history:", error);
    res.status(500).json({ error: "Failed to fetch analyze history" });
  }
});

router.post(
  "/reanalyze",
  upload.single("resume"),
  isLoggedIn,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const file = req.file;
      const { oldResumeId } = req.body;

      if (!file)
        return res.status(400).json({ error: "Resume file is required." });
      if (!userId)
        return res.status(401).json({ error: "You are not logged in." });
      if (!oldResumeId)
        return res.status(400).json({ error: "Old resume ID is required." });

      // Delete old records
      await pool.query("DELETE FROM history WHERE resume_id = $1", [
        oldResumeId,
      ]);
      await pool.query("DELETE FROM resumes WHERE id = $1", [oldResumeId]);

      // Extract text from PDF
      const buffer = fs.readFileSync(file.path);
      const pdfData = await pdfParse(buffer);
      const resumeText = pdfData.text;

      const jobDescription =
        "Frontend Developer with skills in React, JavaScript, HTML, CSS, Git, and Responsive Design.";

      const prompt = generatePrompt(resumeText, jobDescription);
      const rawResponse = await getGeminiResponse(prompt);
      const cleanResponse = rawResponse.trim().replace(/```json|```/g, "");
      const { score, keywords, suggestions } = JSON.parse(cleanResponse);

      const title = file.originalname.replace(/\.pdf$/, "");
      const fileUrl = `/uploads/${file.filename}`;

      const insertQuery = `
      INSERT INTO resumes (user_id, title, file_url, job_description, ai_score, keywords, suggestions)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `;

      const result = await pool.query(insertQuery, [
        userId,
        title,
        fileUrl,
        jobDescription,
        score,
        keywords,
        suggestions.join("\n"),
      ]);

      const resumeId = result.rows[0].id;

      await pool.query(
        `INSERT INTO history (user_id, resume_id, action) VALUES ($1, $2, $3)`,
        [userId, resumeId, "analyze"]
      );

      fs.unlinkSync(file.path); // Cleanup uploaded file

      res.json({ resumeId, ai_score: score, keywords, suggestions });
    } catch (err) {
      console.error("Error analyzing resume:", err);
      res.status(500).json({ error: "Internal server error." });
    }
  }
);

router.delete("/delete", isLoggedIn, async (req, res) => {
  try {
    const { historyId } = req.body;

    const result = await pool.query(
      `WITH deleted_history AS (
        DELETE FROM history WHERE id = $1 RETURNING resume_id
      )
      DELETE FROM resumes WHERE id IN (SELECT resume_id FROM deleted_history);`,
      [historyId]
    );

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ error: "History entry not found or unauthorized" });
    }

    res.status(200).json({ message: "History entry deleted" });
  } catch (error) {
    console.error("Error deleting history:", error);
    res.status(500).json({ error: "Failed to delete history entry" });
  }
});

module.exports = router;
