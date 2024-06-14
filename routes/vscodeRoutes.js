const express = require('express');
const VSCodeController = require("../vscode-gateway/VSCodeController");
const vscodeRouter = express.Router();
const vscodeController = new VSCodeController();
const getHighlightedCodeHandler = vscodeController.getHighlightedCode.bind(vscodeController);
vscodeRouter.post("/highlight", getHighlightedCodeHandler);
vscodeRouter.post('/generate-project', async (req, res) => {
    const { projectDescription } = req.body;
    // Call OpenAI API or your logic to generate project architecture
    const projectStructure = await vscodeController.generateProjectStructure(projectDescription);
    res.json(projectStructure);
  });
module.exports = vscodeRouter;