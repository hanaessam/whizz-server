const { setPrompt, processPrompt } = require('../openAI-gateway/OpenAIManager');
const ResponseParser = require('../chat-module/ResponseParser');

class VSCodeController {
    constructor() {
        this.highlightedCode = "";
    }

    getHighlightedCode(req, res) {
        this.highlightedCode = req.body.highlightedCode;
        console.log("Highlighted text received:", this.highlightedCode);
        res.status(200).send(this.highlightedCode);
    }

    async generateProjectStructure(description) {
        // Set the prompt for OpenAI API
        setPrompt(description);
        
        try {
            // Process the prompt to get a response from OpenAI
            const aiResponse = await processPrompt();
            console.log("AI response:", aiResponse);
            
            // Parse the response to get a project structure
            const parser = new ResponseParser(aiResponse);
            const projectStructure = parser.parseFileArch();
            
            return projectStructure;
        } catch (error) {
            console.error("Error generating project structure:", error);
            throw error;
        }
    }
}

module.exports = VSCodeController;
