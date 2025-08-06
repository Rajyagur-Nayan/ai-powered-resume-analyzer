const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Absolute path to the templates folder
const templatesDir = path.join(__dirname, 'templates');

// ✅ 1. Route to list all template files
router.get('/list', (req, res) => {
    fs.readdir(templatesDir, (err, files) => {
        if (err) {
            console.error("Error reading template directory:", err);
            return res.status(500).send("Could not list templates.");
        }

        // Only return files with .pdf or .docx extensions
        const templates = files.filter(file => file.endsWith('.pdf') || file.endsWith('.docx'));
        res.json(templates);
    });
});

// ✅ 2. Route to download a specific file
router.get('/download/:filename', (req, res) => {
    const file = req.params.filename;
    const filePath = path.join(templatesDir, file);

    res.download(filePath, file, (err) => {
        if (err) {
            console.error("Download error:", err);
            res.status(404).send("Template not found.");
        }
    });
});

module.exports = router;
