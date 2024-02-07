OpenAiManager = require('./OpenAIManager.js');
axios = require('axios');

class openAiController {
    constructor() {
        this.openaiManager = new OpenAiManager();
        this.response = "";
    }
    async processPrompt(req, res) {
        console.log("api controller working");
        this.openaiManager.setPrompt(req.body.prompt);
        this.response = await this.openaiManager.processPrompt();
        res.status(200).send(this.response);
    }

}
module.exports = openAiController;