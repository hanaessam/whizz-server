const { setPrompt, processPrompt } = require('../openAI-gateway/OpenAIManager');
const SwitchCodeLanguagePromptGenerator = require('../chat-module/prompts/SwitchLangPromptGenerator');
const extractCodeInLanguage = require('../parsers/switchCodeParser');

async function switchCodeLanguage(fromLanguage, toLanguage, code, userId) {

    // Generate the prompt
    const promptGenerator = new SwitchCodeLanguagePromptGenerator();
    promptGenerator.setFromLanguage(fromLanguage);

    promptGenerator.setCodeSnippet(code);

    promptGenerator.setToLanguage(toLanguage);

    const prompt = promptGenerator.generatePrompt();
    setPrompt(prompt);

    try {
        // Process the prompt to get a response from OpenAI
        const aiResponse = await processPrompt(userId);
        const parsedCode = extractCodeInLanguage(aiResponse);
        console.log("AI Response:", parsedCode);
        return parsedCode;
    } catch (error) {
        console.error("Error switching language:", error);
    }
}

module.exports = switchCodeLanguage;