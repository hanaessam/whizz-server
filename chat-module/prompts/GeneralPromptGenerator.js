const PromptGenerator = require('./PromptGenerator');
class GeneralPromptGenerator extends PromptGenerator {
    constructor() {
        super();
    }
    setPrompt(prompt) {
        this.prompt = prompt;
    }
    setCodeSnippet(codeSnippet) {
        this.codeSnippet = codeSnippet;
    }
    generatePrompt() {
        this.prompt = `you are a software engineer,\n${this.codeSnippet}\nyour audience is programmers ?`;
        return this.prompt;
    }
}
module.exports = GeneralPromptGenerator;