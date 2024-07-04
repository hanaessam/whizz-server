const axios = require('axios');
const VSCodeController = require('../vscode-gateway/VSCodeController');
const ChatSession = require('./ChatSession');
const { setPrompt } = require('../openAI-gateway/OpenAIManager');
class ChatController {
    constructor() {
        this.vscodeController = new VSCodeController();
    }
    async processInput(req, res) {
        try {
            this.chatSession = new ChatSession();
            const gptResponse = await this.chatSession.processInput(req);
            res.status(200).send(gptResponse);
        } catch (error) {
            console.error('Error generating the prompt:', error);
        }
    }

}
module.exports = ChatController;