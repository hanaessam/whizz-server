const PromptGenerator = require('./PromptGenerator');
class FixPromptGenerator extends PromptGenerator {
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
        this.prompt = `you are a software engineer, fix this code:\n${this.codeSnippet}\n\nyour audience is 
        programmers ?`;
        return this.prompt;
    }
}
module.exports = FixPromptGenerator;