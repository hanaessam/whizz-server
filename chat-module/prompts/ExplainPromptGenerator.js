const PromptGenerator = require('./PromptGenerator');
class ExplainPromptGenerator extends PromptGenerator {
    constructor() {
        super();
    }
    setPrompt(prompt) {
        this.prompt = prompt;
    }
    setCodeSnippet(codeSnippet) {
        this.codeSnippet = codeSnippet;
    }
    setSummary(summary){
        this.summary = summary;
    }
    generatePrompt() {
        this.prompt = `you are a software engineer, explain this code in maximum 5 general points:\n${this.codeSnippet}\n\nyour audience is programmers. This is project summary: ${this.summary}`;
        return this.prompt;
    }
}
module.exports = ExplainPromptGenerator;