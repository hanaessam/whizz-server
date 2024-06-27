const PromptGenerator = require('./PromptGenerator');

class SummarizePromptGenerator extends PromptGenerator {
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
        this.prompt = `you are a software engineer, summarize important things in this file :\n${this.codeSnippet}\n\n . Response should be summary only`;
        return this.prompt;
    }
}
module.exports = SummarizePromptGenerator;