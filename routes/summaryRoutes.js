const express = require('express');
const summaryRouter = express.Router();

summaryRouter.post("/summarize", summaryController.handleSummaryRequest);