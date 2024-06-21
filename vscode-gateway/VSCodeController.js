const { setPrompt, processPrompt } = require('../openAI-gateway/OpenAIManager');
const FileArchPromptGenerator = require('../chat-module/prompts/FileArchPromptGenerator');
const ResponseParser = require('../chat-module/ResponseParser');
const switchCodeLanguage = require('./SwitchCodeLanguageManager'); 

class VSCodeController {
    constructor() {
      this.highlightedCode = "";
    }
  
    getHighlightedCode(req, res) {
      this.highlightedCode = req.body.highlightedCode;
      console.log("Highlighted text received:", this.highlightedCode);
      res.status(200).send(this.highlightedCode);
    }
  
    async generateProjectStructure(req, res) {
      const { projectName, projectDescription, projectFramework } = req.body;
  
      // Generate the prompt
      const promptGenerator = new FileArchPromptGenerator();
      promptGenerator.setProjectName(projectName);
      promptGenerator.setProjectDescription(projectDescription);
      promptGenerator.setProjectFramework(projectFramework);
  
      const prompt = promptGenerator.generatePrompt();
      setPrompt(prompt);
  
      try {
        // Process the prompt to get a response from OpenAI
        const aiResponse = await processPrompt();
        console.log("AI Response:", aiResponse);
  
        // Parse the response to get a project structure
        const parser = new ResponseParser(aiResponse);
        const projectStructure = parser.parseFileArch();
  
        console.log("Parsed Project Structure:", projectStructure);
  
        res.json(projectStructure);
      } catch (error) {
        console.error("Error generating project structure:", error);
        res.status(500).send("Error generating project structure");
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