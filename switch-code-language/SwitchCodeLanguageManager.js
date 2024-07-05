const { setPrompt, processPrompt } = require('../openAI-gateway/OpenAIManager');
const SwitchCodeLanguagePromptGenerator = require('../chat-module/prompts/SwitchLangPromptGenerator');
const ResponseParser = require('../chat-module/ResponseParser');


class SwitchCodeLanguageManager {
    constructor() { }

    async switchCodeLanguage(fromLanguage, toLanguage, code, userId) {

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
            const parsedResponse = new ResponseParser(aiResponse);
            const switchCodeLanguageResponse = parsedResponse.parseSwitchCodeLanguage();
            return switchCodeLanguageResponse;
        } catch (error) {
            console.error("Error switching language:", error);
        }
    }

}




module.exports = SwitchCodeLanguageManager;