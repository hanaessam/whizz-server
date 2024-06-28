const ProjectFileManager = require("../file-architecture/ProjectFileManager");

const CodeDocumentationManager = require("../code-documentation/CodeDocumentationManager");
const path = require("path");
const switchCodeLanguage = require('./SwitchCodeLanguageManager'); 

class VSCodeController {
  constructor() {
    this.highlightedCode = "";
    this.projectFileManager = new ProjectFileManager();
    this.codeDocumentationManager = new CodeDocumentationManager();
  }

  getHighlightedCode(req, res) {
    this.highlightedCode = req.body.highlightedCode;
    console.log("Highlighted text received:", this.highlightedCode);
    res.status(200).send(this.highlightedCode);
  }

  getProjectPath(req, res) {
    const projectPath = req.body.projectPath;
    if (!projectPath) {
      console.error("Project path not provided");
      return res.status(400).send("Project path is required");
    }
    console.log("Project path received:", projectPath);
    console.log(res);
    res.status(200).send(projectPath);
  }

  async generateProjectStructure(req, res) {
    const projectDetails = req.body;
    console.log("Project details received:", projectDetails);

    try {
      const projectStructure =
        await this.projectFileManager.generateProjectStructure(projectDetails);
      res.status(200).send(projectStructure);
    } catch (error) {
      console.error("Error generating project structure:", error);
      res.status(500).send("Error generating project structure");
    }
  }

  async generateDocumentation(req, res) {
    const documentationDetails = req.body;
    console.log("Documentation details received:", documentationDetails);
    try {
      const response =
        await this.codeDocumentationManager.generateDocumentation(
          documentationDetails
        );
      res.status(200).send(response);
    } catch (error) {
      console.error("Error generating documentation:", error);
      res.status(500).send("Error generating documentation");
    }
  }
    async SwitchCodeLanguage(req , res){
      
      const { fromLang, toLang, codeSnippet } = req.body;
      try {
        const code = await switchCodeLanguage(fromLang, toLang, codeSnippet);
        console.log("from controller", code);
        res.json(code);
      } catch (error) {
        console.error("Error switching code language:", error);
        res.status(500).send("Error switching code language");
      }

    }
}
module.exports = VSCodeController;

