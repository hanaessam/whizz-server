const PromptGenerator = require('./PromptGenerator');
const Message = require('./Message');
const ChatController = require('./ChatController');

class ChatSession {
    constructor() {
        this.currentMsg = new Message();
        this.chatController = new ChatController();
    }
    async processInput() {
        this.currentMsg.data = await this.chatController.processInput();
        console.log(this.currentMsg.data);
    }

}
module.exports = ChatSession;