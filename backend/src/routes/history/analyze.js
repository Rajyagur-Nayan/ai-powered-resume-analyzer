
const express = require("express");
const router = express.Router();
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const path = require("path");
const isLoggedIn = require('../../middelwear/login.js')

const pool = require("../../connections/DB.connect.js"); // PostgreSQL pool
const getGeminiResponse = require("../../controllers/gemini.js");
const generatePrompt = require("../../controllers/prompt.js");

// File upload config
const upload = multer({ dest: "uploads/" });

// Get analyze history with resume details
router.get('/', isLoggedIn, async (req, res) => {
  try {
    const userId = req.user.id;

    const query = `
       SELECT 
        h.id AS history_id,
        r.id AS resume_id,
        r.title AS resume_title,
        r.ai_score,
        h.created_at,
        h.action
      FROM history h
      JOIN resumes r ON h.resume_id = r.id
      WHERE h.user_id = $1
      ORDER BY h.created_at DESC
    `;

    const { rows } = await pool.query(query, [userId]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching analyze history:', error);
    res.status(500).json({ error: 'Failed to fetch analyze history' });
  }
});

router.post('/reanalyze', upload.single("resume"), isLoggedIn, async (req, res) => {
  try {
    const userId = req.user.id;
    const file = req.file;
    const { oldResumeId } = req.body;

    if (!file) {
      return res.status(400).json({ error: "Resume file is required." });
    }
    if (!userId) {
      return res.status(400).json({ error: "You are not logged in." });
    }
    if (!oldResumeId) {
      return res.status(400).json({ error: "old resume id is not given" });
    }

    await pool.query('DELETE FROM history WHERE resume_id = $1'[oldResumeId])
    await pool.query('DELETE FROM resumes WHERE id = $1'[oldResumeId])

    // Extract resume text
    const buffer = fs.readFileSync(file.path);
    const pdfData = await pdfParse(buffer);
    const resumeText = pdfData.text;

    // Create a generic job description (or pick a default one)
    const jobDescription = "Frontend Developer with skills in React, JavaScript, HTML, CSS, Git, and Responsive Design.";

    // Generate prompt + get Gemini response
    const prompt = generatePrompt(resumeText, jobDescription);
    const rawResponse = await getGeminiResponse(prompt);
    const cleanResponse = rawResponse.trim().replace(/```json|```/g, "");

    const { score, keywords, suggestions } = JSON.parse(cleanResponse);

    // Auto-generate a title from resume (optional fallback)
    const title = file.originalname.replace(/\.pdf$/, "");

    // Save resume in DB
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

    // Log action in history
    await pool.query(
      `INSERT INTO history (user_id, resume_id, action) VALUES ($1, $2, $3)`,
      [userId, resumeId, "analyze"]
    );

    // Clean up uploaded file
    fs.unlinkSync(file.path);

    return res.json({
      resumeId,
      ai_score: score,
      keywords,
      suggestions,
    });

  } catch (err) {
    console.error("Error analyzing resume:", err.message);
    return res.status(500).json({ error: "Internal server error." });
  }
});




module.exports = router;


