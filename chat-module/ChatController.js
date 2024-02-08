const axios = require('axios');
const VSCodeController = require('../vscode-gateway/VSCodeController');
class ChatController {
    constructor() {
        this.vscodeController = new VSCodeController();
    }
    async processInput(req, res) {
        try {
            const response = await axios.get('http://localhost:8888/highlight');
            const selectedCode = this.vscodeController.getHighlightedCode(response.data);
            console.log('Selected Code:', selectedCode);
        } catch (error) {
            console.error('Error getting selected code:', error);
        }
    }
}
module.exports = ChatController;