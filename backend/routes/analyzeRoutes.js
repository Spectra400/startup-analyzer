const express = require('express');
const router = express.Router();
const { analyzeIdea } = require('../controllers/analyzeController');

// POST /api/analyze
router.post('/analyze', analyzeIdea);

module.exports = router;
