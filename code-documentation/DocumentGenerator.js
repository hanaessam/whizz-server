const { setPrompt, processPrompt } = require("../openAI-gateway/OpenAIManager");
const CodeDocPromptGenerator = require("../chat-module/prompts/CodeDocPromptGenerator");

class DocumentGenerator {
  constructor() {}

  async generateContent(projectPath, fields, projectSummary) {
    const promptGenerator = new CodeDocPromptGenerator();
    promptGenerator.setProjectPath(projectPath);
    promptGenerator.setDocumentationFields(fields);
    promptGenerator.setProjectSummary(projectSummary);
    const prompt = promptGenerator.generatePrompt();

    setPrompt(prompt);

    try {
      const response = await processPrompt();
      return response;
    } catch (error) {
      throw new Error(
        "Failed to generate documentation content: " + error.message
      );
    }
  }

  async generate(document, filename) {
    throw new Error(
      "Abstract method generate() must be implemented by subclass"
    );
  }
}

module.exports = DocumentGenerator;
