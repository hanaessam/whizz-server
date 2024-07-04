const ProjectFileManager = require("../file-architecture/ProjectFileManager");

const CodeDocumentationManager = require("../code-documentation/CodeDocumentationManager");
const path = require("path");
const switchCodeLanguage = require("../switch-code-language/SwitchCodeLanguageManager");
const UnitTestsEndpoint = require("../unit_tests/UnitTestsEndpoint");

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
    const userId = req.body;
    console.log("Project details received:", projectDetails);

    try {
      const projectStructure =
        await this.projectFileManager.generateProjectStructure(projectDetails, userId);
      res.status(200).send(projectStructure);
    } catch (error) {
      console.error("Error generating project structure:", error);
      res.status(500).send("Error generating project structure");
    }
  }

  async generateDocumentation(req, res) {
    this.codeDocumentationManager = new CodeDocumentationManager();
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
  async SwitchCodeLanguage(req, res) {
    const { fromLanguage, toLanguage, codeSnippet, userId } = req.body;
    try {
      const code = await switchCodeLanguage(
        fromLanguage,
        toLanguage,
        codeSnippet,
        userId
      );
      console.log("from controller", code);
      res.status(200).send(code);
    } catch (error) {
      console.error("Error switching code language:", error);
      res.status(500).send("Error switching code language");
    }
  }
  async UnitTestsEndpoint(req, res) {
    const code_snippet = req.body;
    const userId = req.body;
    try {
      const aiResponse = await UnitTestsEndpoint(code_snippet, userId);
      console.log("Generated unit tests:", aiResponse);
      res.status(200).send(aiResponse);
    } catch (error) {
      console.error("Error generating unit tests:", error);
      res.status(500).send("Error generating unit tests");
    }
  }
}
module.exports = VSCodeController;
