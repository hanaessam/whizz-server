const express = require('express');
const VSCodeController = require("../vscode-gateway/VSCodeController");
const vscodeRouter = express.Router();
const vscodeController = new VSCodeController();
const getHighlightedCodeHandler = vscodeController.getHighlightedCode.bind(vscodeController);
vscodeRouter.post("/highlight", getHighlightedCodeHandler);
module.exports = vscodeRouter;