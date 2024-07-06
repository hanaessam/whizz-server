const PromptGenerator = require('./PromptGenerator');
class UnitTestsPromptGenerator extends PromptGenerator {
    constructor() {
        super();
    }
    setPrompt(prompt) {
        this.prompt = prompt;
    }
    setCodeSnippet(codeSnippet) {
        this.codeSnippet = codeSnippet;
    }
    generatePrompt(language) {
        let prompt = '';

        if (language.toLowerCase() === 'python') {
            prompt = `
            You are an expert in writing unit tests for Python code. Your task is to generate a comprehensive set of unit tests for the following function using pytest. Ensure that the tests cover various cases, including normal cases, edge cases, and error handling.

            Here is the function:

            ${this.codeSnippet}

            Requirements:
            - Use pytest for writing the tests.
            - Include tests for positive numbers, negative numbers, zero, and large numbers.
            - Include tests for incorrect input types to ensure the function handles errors properly.

            Provide the complete code for the unit tests.`;
        } else if (language.toLowerCase() === 'java') {
            prompt = `
            You are an expert in writing unit tests for Java code. Your task is to generate a comprehensive set of unit tests for the following method using JUnit 5. Ensure that the tests cover various cases, including normal cases, edge cases, and error handling.

            Here is the Java method:

            ${this.codeSnippet}

            Requirements:
            - Use JUnit 5 for writing the tests.
            - Include tests for positive numbers, negative numbers, zero, and large numbers.
            - Ensure the tests are well-structured and include assertions to verify the expected outcomes.
            - Provide the complete code for the unit tests, including necessary imports.`
                ;
        } else if (language.toLowerCase() === 'c++') {
            prompt = `
            You are an expert in writing unit tests for C++ code. Your task is to generate a comprehensive set of unit tests for the following function. Ensure that the tests cover various cases, including normal cases, edge cases, and error handling.
    
            Here is the C++ function:
    
            ${this.codeSnippet}
    
            Requirements:
            - Use a suitable C++ testing framework (e.g., Google Test, Catch2).
            - Include tests for positive numbers, negative numbers, zero, and large numbers.
            - Include tests for invalid inputs to ensure the function handles errors properly.
    
            Provide the complete code for the unit tests `;
        } else if (language.toLowerCase() === 'c') {
            prompt = `
            You are an expert in writing unit tests for C code. Your task is to generate a comprehensive set of unit tests for the following function. Ensure that the tests cover various cases, including normal cases, edge cases, and error handling.
    
            Here is the C function:
    
            ${this.codeSnippet}
    
            Requirements:
            - Use a suitable C testing framework (e.g., CUnit).
            - Include tests for positive numbers, negative numbers, zero, and large numbers.
            - Include tests for invalid inputs to ensure the function handles errors properly.
    
            Provide the complete code for the unit tests.`;
        } else if (language.toLowerCase() === 'javascript') {
            prompt = `
            You are an expert in writing unit tests for JavaScript code. Your task is to generate a comprehensive set of unit tests for the following function using Jest. Ensure that the tests cover various cases, including normal cases, edge cases, and error handling.

            Here is the JavaScript function:
            
            ${this.codeSnippet}
            
            Requirements:
            - Use Jest for writing the tests.
            - Include tests for positive numbers, negative numbers, zero, and large numbers.
            - Include tests for incorrect input types to ensure the function handles errors properly.
            
            Provide the complete code for the unit tests.`;
        } else if (language.toLowerCase() === 'go') {
            prompt = `
            You are an expert in writing unit tests for Go code. Your task is to generate a comprehensive set of unit tests for the following function. Ensure that the tests cover various cases, including normal cases, edge cases, and error handling.
    
            Here is the Go function:
    
            ${this.codeSnippet}
    
            Requirements:
            - Use a suitable Go testing framework (e.g., testing).
            - Include tests for positive numbers, negative numbers, zero, and large numbers.
            - Include tests for invalid inputs to ensure the function handles errors properly.
    
            Provide the complete code for the unit tests.`;
        } else {
            prompt = `
            You are an expert in writing unit tests. Your task is to generate a comprehensive set of unit tests for the following code snippet. Ensure that the tests cover various cases, including normal cases, edge cases, and error handling.

            Here is the code snippet:

            ${this.codeSnippet}

            Requirements:
            - Ensure the tests are well-structured and include assertions to verify the expected outcomes.
            - Provide the complete code for the unit tests.    make sure the code block is JSON parsable
            `;
        }

        this.prompt = prompt;
        return this.prompt;
    }
}
module.exports = UnitTestsPromptGenerator;