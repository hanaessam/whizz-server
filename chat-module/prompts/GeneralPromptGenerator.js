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
    setSummary(summary){
        this.summary = summary;
    }
    generatePrompt() {
        this.prompt = `${this.prompt}, selected code snippet: \n${this.codeSnippet}\n`;
        return this.prompt;
    }
}
module.exports = GeneralPromptGenerator;