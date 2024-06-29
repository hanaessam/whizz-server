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
        this.prompt = `You are a software engineer, summarize this file in short sentences:\n${this.codeSnippet}\n\n . Response should consist of the summary only.`;
        return this.prompt;
    }
}

module.exports = SummarizePromptGenerator;