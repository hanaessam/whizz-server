const express = require('express');
const summaryRouter = express.Router();
const summaryController = require('../code-summary/summaryController')

summaryRouter.post("/summarize", summaryController.handleSummaryRequest);

module.exports = summaryRouter;