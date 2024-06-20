const PromptGenerator = require('./PromptGenerator');
class UnitTestingJava extends PromptGenerator {
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
        this.prompt = `You are an expert in writing unit tests for Java code. Your task is to generate a comprehensive set of unit tests for the following method using JUnit 5. Ensure that the tests cover various cases, including normal cases, edge cases, and error handling.

        Here is the Java method:
    
        ${this.codeSnippet}
    
        Requirements:
        - Use JUnit 5 for writing the tests.
        - Include tests for positive numbers, negative numbers, zero, and large numbers.
        - Ensure the tests are well-structured and include assertions to verify the expected outcomes.
        - Provide the complete code for the unit tests, including necessary imports.
    
        Provide the complete code for the unit tests.`
        return this.prompt;
    }
}
module.exports = UnitTestingJava;