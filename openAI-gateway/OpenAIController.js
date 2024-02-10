OpenAiManager = require('./OpenAIManager.js');
axios = require('axios');

class openAiController {
    constructor() {
        this.openaiManager = new OpenAiManager();
    }
    async processPrompt(req, res) {
        console.log("api controller working");
        this.openaiManager.setPrompt(req.body.prompt);
        this.response = await this.openaiManager.processPrompt();
        console.log(this.response);
        res.status(200).send(this.response);
    }

}
module.exports = openAiController;