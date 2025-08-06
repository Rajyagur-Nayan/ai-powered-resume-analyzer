
const express = require('express');
const router = express.Router();
const pool = require('../../connections/DB.connect');
const isLoggedIn = require('../../middelwear/login');

// Get analyze history with resume details
router.get('/', isLoggedIn, async (req, res) => {
    try {
    const userId = req.user.id;

        const query = `
       SELECT 
        h.id AS history_id,
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

router.post('/reanalyze', isLoggedIn, async (req, res) => {
  try {
    const { resumeId } = req.body;
    const userId = req.user.id;

    const newScore = Math.floor(Math.random() * 21) + 80;

    await pool.query(`
      UPDATE resumes
      SET ai_score = $1
      WHERE id = $2 AND user_id = $3
    `, [newScore, resumeId, userId]);

    await pool.query(`
      INSERT INTO history (user_id, resume_id, action)
      VALUES ($1, $2, 'reanalyze')
    `, [userId, resumeId]);

    res.status(200).json({ message: 'Resume reanalyzed', score: newScore });
  } catch (err) {
    console.error('Error reanalyzing resume:', err);
    res.status(500).json({ error: 'Failed to reanalyze' });
  }
});



router.delete('/delete', isLoggedIn, async (req, res) => {
  try {
    const { historyId } = req.body;
    const userId = req.user.id; // pulled from middleware

    const result = await pool.query(
      `DELETE FROM history 
       WHERE id = $1 AND user_id = $2 
       RETURNING *`,
      [historyId, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'History entry not found or unauthorized' });
    }

    res.status(200).json({ message: 'History entry deleted' });
  } catch (error) {
    console.error('Error deleting history:', error);
    res.status(500).json({ error: 'Failed to delete history entry' });
  }
});



module.exports = router;


