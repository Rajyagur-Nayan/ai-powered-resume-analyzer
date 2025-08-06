const generateResumePrompt = (resumeText, jobDescription) => {
  return `
You are an AI resume analyzer.

Given the following:

Resume:
${resumeText}

Job Description:
${jobDescription}

Respond ONLY in JSON with:
{
  "score": <integer between 0-100>,
  "keywords": {
    "matched": ["term1", "term2"],
    "missing": ["term3", "term4"]
  },
  "suggestions": [
    "Improve summary",
    "Mention more tools used in X role"
  ]
}
`.trim();
};

module.exports = generateResumePrompt;
