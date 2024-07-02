const PromptGenerator = require('./PromptGenerator');
class detectLanGenerator extends PromptGenerator {
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
        this.prompt = `
        Given the following code snippet, determine the programming language:

        \`\`\`
        ${this.codeSnippet}
        \`\`\`

        Respond with only the name of the programming language.

        An example response: C++.
        `;
        return this.prompt;
    }
}
module.exports = detectLanGenerator;