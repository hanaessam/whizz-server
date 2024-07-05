class PromptGenerator {
    constructor() {
        this.prompt = "";
    }

    setPrompt(prompt) {
        this.prompt = prompt;
    }

    generatePrompt() {
        return this.prompt;
    }

    chainOfThought(response) {
        const chainPrompt = `Here is the response:\n\n${response}\n\nProvide a step-by-step explanation of the thought process that led to this response.`;
       return chainPrompt;
    }

    reversePrompting(response) {
        const reversePrompt = `Based on the following response: \n\n ${response}, what was the original question?\n\nResponse:\n${response}\n\nOriginal question:`;
        return reversePrompt;
    }

    feedbackLoop(initialResponse) {
        let currentResponse = initialResponse;
        let previousResponse = "";
        let loopCounter = 0;
        let feedbackPrompt = "";

        while (currentResponse !== previousResponse && loopCounter < 5) {
            previousResponse = currentResponse;

            feedbackPrompt = `Here is the response to the initial prompt:\n\n${currentResponse}\n\nWhat improvements can be made to this response? Provide a revised response.`;
            this.setPrompt(feedbackPrompt);
            loopCounter++;
        }

        return feedbackPrompt;
    }
}

module.exports = PromptGenerator;