const { setPrompt, processPrompt } = require('../openAI-gateway/OpenAIManager');
const FileArchPromptGenerator = require('../chat-module/prompts/FileArchPromptGenerator');
const ResponseParser = require('../chat-module/ResponseParser');
const ProjectFileManager = require('../file-architecture/ProjectFileManager');

class VSCodeController {
    constructor() {
      this.highlightedCode = "";
      this.projectFileManager = new ProjectFileManager();
    }
  
    getHighlightedCode(req, res) {
      this.highlightedCode = req.body.highlightedCode;
      console.log("Highlighted text received:", this.highlightedCode);
      res.status(200).send(this.highlightedCode);
    }

    async generateProjectStructure(req, res) {
      const projectDetails = req.body;
      console.log("Project details received:", projectDetails);
  
      try {
        const projectStructure = await this.projectFileManager.generateProjectStructure(projectDetails);
        res.status(200).send(projectStructure);
      } catch (error) {
        console.error("Error generating project structure:", error);
        res.status(500).send("Error generating project structure");
      }
    }
  
   
  }
  
  module.exports = VSCodeController;