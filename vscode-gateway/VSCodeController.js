const ProjectFileManager = require("../file-architecture/ProjectFileManager");

const CodeDocumentationManager = require("../code-documentation/CodeDocumentationManager");
const path = require("path");
const SwitchCodeLanguageManager = require("../switch-code-language/SwitchCodeLanguageManager");
const UnitTestsManager = require("../unit-tests/UnitTestsManager");

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
    const { projectDetails, userId } = req.body;
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
    const { documentationDetails, userId } = req.body;
    console.log("Documentation details received:", documentationDetails);
    try {
      const response =
        await this.codeDocumentationManager.generateDocumentation(
          documentationDetails,
          userId
        );
      res.status(200).send(response);
    } catch (error) {
      console.error("Error generating documentation:", error);
      res.status(500).send("Error generating documentation");
    }
  }

  async switchCodeLanguage(req, res) {
    const { fromLanguage, toLanguage, codeSnippet, userId } = req.body;
    const switchCodeLanguageManager = new SwitchCodeLanguageManager();
    try {
      const code = await switchCodeLanguageManager.switchCodeLanguage(
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
  async generateUnitTests(req, res) {
    const unitTestsManager = new UnitTestsManager();
    const { codeSnippet, userId } = req.body;

    try {
      const aiResponse = await unitTestsManager.generateUnitTests(codeSnippet);
      console.log("Generated unit tests:", aiResponse);
      res.status(200).send(aiResponse);
    } catch (error) {
      console.error("Error generating unit tests:", error);
      res.status(500).send("Error generating unit tests");
    }
  }
}
module.exports = VSCodeController;
