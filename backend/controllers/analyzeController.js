const { analyzeStartup } = require('../services/groqService');

async function analyzeIdea(req, res) {
  try {
    const { idea, targetUsers, country } = req.body;

    // Validate required fields
    if (!idea || !targetUsers || !country) {
      return res.status(400).json({
        error: 'Missing required fields. Please provide idea, targetUsers, and country.'
      });
    }

    if (idea.trim().length < 10) {
      return res.status(400).json({
        error: 'Startup idea must be at least 10 characters long.'
      });
    }

    const analysis = await analyzeStartup(idea, targetUsers, country);

    return res.status(200).json({
      success: true,
      idea,
      targetUsers,
      country,
      analysis
    });
  } catch (error) {
    console.error('Analysis Error:', error.message);
    return res.status(500).json({
      error: error.message || 'An error occurred while analyzing the startup idea.'
    });
  }
}

module.exports = { analyzeIdea };
