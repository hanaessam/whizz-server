const OpenAI = require('openai')
const config = require('dotenv').config;

class OpenAiManager {
    constructor() {
        this.apiKey = process.env.OPENAI_API_KEY;
        this.prompt = "";
        this.response = "";
        this.model = "gpt-3.5-turbo";

    }
    setPrompt(prompt) {
        this.prompt = prompt;
    }
    async processPrompt() {
        config();
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
        console.log("api manager working");

        const completion = await this.openai.chat.completions.create({
            messages: [{ role: "system", content: this.prompt }],
            model: this.model
        });

        this.response = completion.choices[0].message.content;
        return this.response;
    }
}

module.exports = OpenAiManager;