const axios = require('axios');
const PromptGenerator = require('./prompts/PromptGenerator');
const GeneralPromptGenerator = require('./prompts/GeneralPromptGenerator');
const ExplainPromptGenerator = require('./prompts/ExplainPromptGenerator');
const FixPromptGenerator = require('./prompts/FixPromptGenerator');
const Message = require('./Message');
const ResponseParser = require('./ResponseParser');
const extractCodeInLanguage = require('../parsers/switchCodeParser')
const { setPrompt, processPrompt } = require('../openAI-gateway/OpenAIManager');

class ChatSession {
    constructor() {
        this.currentMsg = new Message();
    }

    generatorFactory(type) {

        if (type === "explain") {
            return new ExplainPromptGenerator();
        } else if (type === "fix") {
            return new FixPromptGenerator();
        } else if (type === "general") {
            return new GeneralPromptGenerator();
        }
    }

    // i am fixing this
    async processPrompt() {

        const promptData = { prompt: this.currentPrompt, userId: this.userId };

        try {
            // OpenAIManager.setKey(promptData.userId);
            setPrompt(promptData.prompt);
            console.log("process prompt with userid: ", promptData.userId)
            const response = await processPrompt(promptData.userId);
            console.log("DONE", response);
            this.currentResponse = response;
            return response;
        } catch (error) {
            console.error('Error fetching data from vscode API:', error);
            throw error;
        }
    }

    async processInput(req) {
        console.log('here we are in chat session generating prompt');

        this.promptGenerator = this.generatorFactory(req.body.type);
        this.promptGenerator.setCodeSnippet(req.body.codesnippet);
        this.promptGenerator.setPrompt(req.body.prompt);
        this.promptGenerator.setSummary(req.body.summary);
        this.currentPrompt = this.promptGenerator.generatePrompt();
        this.userId = req.body.userId;
        console.log('here we are in chat session processing input');
        console.log(this.req);
        try {
            this.currentResponse = await this.processPrompt();
            const parser = new ResponseParser(this.currentResponse);
            const parsedCode = extractCodeInLanguage(this.currentResponse);

            return { answer: this.currentResponse, code: parsedCode };
        } catch (error) {
            console.error('Error generating the prompt:', error);
            return 'Error generating the prompt';
        }
    }
}

module.exports = ChatSession;
