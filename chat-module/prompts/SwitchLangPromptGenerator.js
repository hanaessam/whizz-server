const PromptGenerator = require('./PromptGenerator');
class SwitchCodeLanguagePromptGenerator extends PromptGenerator {
    constructor() {
        super();
    }
    setPrompt(prompt) {
        this.prompt = prompt;
    }
    setCodeSnippet(codeSnippet) {
        this.codeSnippet = codeSnippet;
    }
    setFromLanguage(language) {
        this.fromLanguage = language;
    }
    setToLanguage(language) {
        this.toLanguage = language;
    }
    generatePrompt() {
        this.prompt = `rewrite the following ${this.fromLanguage} code in ${this.toLanguage}, convert the code from ${this.fromLanguage} to ${this.toLanguage} :\n` +
            `${this.codeSnippet}\n\n the response must be code only `;
        console.log(this.prompt);
        return this.prompt;
    }
}
module.exports = SwitchCodeLanguagePromptGenerator;