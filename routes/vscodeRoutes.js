const express = require('express');
const VSCodeController = require('../vscode-gateway/VSCodeController');
const vscodeRouter = express.Router();
const vscodeController = new VSCodeController();

vscodeRouter.post("/highlight", vscodeController.getHighlightedCode.bind(vscodeController));
vscodeRouter.post('/project-path', vscodeController.getProjectPath.bind(vscodeController));
vscodeRouter.post('/generate-project', vscodeController.generateProjectStructure.bind(vscodeController));
vscodeRouter.post('/generate-documentation', vscodeController.generateDocumentation.bind(vscodeController));

vscodeRouter.post('/switch-code-language', vscodeController.SwitchCodeLanguage.bind(vscodeController) );

module.exports = vscodeRouter;
