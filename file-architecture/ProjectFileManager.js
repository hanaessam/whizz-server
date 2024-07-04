const { setPrompt, processPrompt } = require('../openAI-gateway/OpenAIManager');
const FileArchPromptGenerator = require('../chat-module/prompts/FileArchPromptGenerator');
const ResponseParser = require('../chat-module/ResponseParser');

class ProjectFileManager {
  constructor() { }

  async generateProjectStructure(projectDetails, userId) {
    const { projectName, projectDescription, projectFramework } = projectDetails;


    const promptGenerator = new FileArchPromptGenerator();
    promptGenerator.setProjectName(projectName);
    promptGenerator.setProjectDescription(projectDescription);
    promptGenerator.setProjectFramework(projectFramework);


    const prompt = promptGenerator.generatePrompt();
    setPrompt(prompt);

    try {
      const aiResponse = await processPrompt(userId);
      console.log("AI Response:", aiResponse);


      const parser = new ResponseParser(aiResponse);
      const projectStructure = parser.parseFileArch();

      console.log("Parsed Project Structure:", projectStructure);

      return projectStructure;
    } catch (error) {
      console.error("Error generating project structure:", error);
      throw new Error("Error generating project structure");
    }
  }
}

module.exports = ProjectFileManager;