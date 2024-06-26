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
        this.prompt = `you are a software engineer, this code snippet contains an error :\n${this.codeSnippet}\n\n fix this code. Response should be fixed code only`;
        return this.prompt;
    }
}
module.exports = FixPromptGenerator;