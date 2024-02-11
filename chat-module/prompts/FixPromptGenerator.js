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
        console.log("THIS IS THE CODE SNIPPET: " + this.codeSnippet + '\n');
        this.prompt = `you are a software engineer, fix this code:\n${this.codeSnippet}\n\nyour audience is 
        programmers, answer with the corrected code ONLY`;
        return this.prompt;
    }
}
module.exports = FixPromptGenerator;