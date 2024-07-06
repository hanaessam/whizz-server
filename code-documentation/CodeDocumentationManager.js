
const CodeDocPromptGenerator = require("../chat-module/prompts/CodeDocPromptGenerator");
const { setPrompt, processPrompt } = require("../openAI-gateway/OpenAIManager");

class CodeDocumentationManager {
  constructor() { }

  async generateDocumentation(documentationDetails) {
    const { fields, format, projectPath, projectSummary } =
      documentationDetails;
    if (!fields || !format || !projectPath || !projectSummary) {
      throw new Error(
        "Fields, format, projectPath, and projectSummary are required"
      );
    }
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
}

module.exports = CodeDocumentationManager;
