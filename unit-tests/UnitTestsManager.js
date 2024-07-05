const { setPrompt, processPrompt } = require("../openAI-gateway/OpenAIManager");
const DetectLanguagePromptGenerator = require("../chat-module/prompts/DetectLanguagePromptGenerator");
const UnitTestsPromptGenerator = require("../chat-module/prompts/UnitTestsPromptGenerator");
const ResponseParser = require("../chat-module/ResponseParser");

class UnitTestsManager {
  constructor() {}
  async generateUnitTests(codeSnippet) {
    try {
      // Determine the programming language of the code snippet
      const languageDetector = new DetectLanguagePromptGenerator();
      languageDetector.setCodeSnippet(codeSnippet);
      const detectedLanguageResponse = await languageDetector.generatePrompt();
      const detectedLanguage = detectedLanguageResponse.trim().toLowerCase(); // Adjust if needed based on response format

      // Generate unit tests based on the detected language
      const unitTestsGenerator = new UnitTestsPromptGenerator();
      unitTestsGenerator.setCodeSnippet(codeSnippet);
      const prompt = unitTestsGenerator.generatePrompt(detectedLanguage);
      setPrompt(prompt);

      const aiResponse = await processPrompt();
      console.log("AI Response:", aiResponse);
      const parsedResponse = new ResponseParser(aiResponse);
      const unitTests = parsedResponse.parseUnitTests();
      return unitTests;
    } catch (error) {
      console.error("Error generating unit tests:", error);
      throw error; // Optionally handle or rethrow the error
    }
  }
}

module.exports = UnitTestsManager;
