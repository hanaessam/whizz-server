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
        this.prompt = `you are a software engineer, fix this code and return the line that contains the error:\n${this.codeSnippet}\n\nyour audience is 
        programmers and give me the corrected code on another line?`;
        return this.prompt;
    }
}
module.exports = FixPromptGenerator;