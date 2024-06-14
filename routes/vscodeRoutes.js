const express = require('express');
const VSCodeController = require('../vscode-gateway/VSCodeController');
const vscodeRouter = express.Router();
const vscodeController = new VSCodeController();

const getHighlightedCodeHandler = vscodeController.getHighlightedCode.bind(vscodeController);

vscodeRouter.post('/highlight', getHighlightedCodeHandler);

vscodeRouter.post('/generate-project', async (req, res) => {
    const { projectDescription } = req.body;

    try {
        // Call OpenAI API or your logic to generate project architecture
        const projectStructure = await vscodeController.generateProjectStructure(projectDescription);
        res.json(projectStructure);
    } catch (error) {
        res.status(500).send("Error generating project structure");
    }
});

module.exports = vscodeRouter;
