const { setPrompt, processPrompt } = require('../openAI-gateway/OpenAIManager');
const SwitchCodeLanguagePromptGenerator = require('../chat-module/prompts/SwitchLangPromptGenerator');


async function switchCodeLanguage(fromLanguage, toLanguage, code) {

    // Generate the prompt
    const promptGenerator = new SwitchCodeLanguagePromptGenerator();
    promptGenerator.setFromLanguage(fromLanguage);

    promptGenerator.setCodeSnippet(code);

    promptGenerator.setToLanguage(toLanguage);

    const prompt = promptGenerator.generatePrompt();
    setPrompt(prompt);

    try {
        // Process the prompt to get a response from OpenAI
        const aiResponse = await processPrompt();
        console.log("AI Response:", aiResponse);
        return aiResponse;
    } catch (error) {
        console.error("Error switching language:", error);
    }
}

module.exports = switchCodeLanguage;