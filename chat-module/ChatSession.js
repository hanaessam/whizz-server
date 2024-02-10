const PromptGenerator = require('./prompts/PromptGenerator');
const GeneralPromptGenerator = require('./prompts/GeneralPromptGenerator');
const ExplainPromptGenerator = require('./prompts/ExplainPromptGenerator');
const FixPromptGenerator = require('./prompts/FixPromptGenerator');
const Message = require('./Message');
const ChatController = require('./ChatController');
const VSCodeController = require('../vscode-gateway/VSCodeController');


class ChatSession {
    constructor() {
        this.currentMsg = new Message();
    }
    generatorFactory() {
        console.log(this.originalPrompt.body.type);

        if (this.originalPrompt.body.type == "explain") {
            return new ExplainPromptGenerator();
        }
        else if (this.originalPrompt.body.type == "fix") {
            return new FixPromptGenerator();
        }
        else {
            return new GeneralPromptGenerator();
        }
    }
    async processPrompt() {
        const apiUrl = 'http://localhost:8888/openai/processPrompt';
        console.log("sending this to gpt" + this.currentPrompt);
        const promptData = { "prompt": this.currentPrompt };

        try {
            const response = await axios.post(apiUrl, promptData);
            console.log(response.data);
            this.currentResponse = response.data;
            return response.data;
        } catch (error) {
            console.error('Error fetching data from vscode API:', error);
            throw error; // Re-throw the error so that it can be caught in the calling function
        }
    }

    async processInput(request) {
        console.log('here we are in chat session generating prompt');
        this.originalPrompt = request;

        this.promptGenerator = this.generatorFactory();
        this.promptGenerator.setCodeSnippet(this.originalPrompt.body.codesnippet);
        this.currentPrompt = this.promptGenerator.generatePrompt(this.originalPrompt);
        console.log('here we are in chat session processing input');

        try {
            this.currentResponse = await this.processPrompt();
            return this.currentResponse;
        } catch (error) {
            console.error('Error generating the prompt:', error);
            return 'Error generating the prompt'; // or handle the error in a way that suits your application
        }
    }


}
module.exports = ChatSession;