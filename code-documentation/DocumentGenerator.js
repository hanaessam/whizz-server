const { setPrompt, processPrompt } = require('./OpenAIManager');
const CodeDocPromptGenerator = require('./CodeDocPromptGenerator');

class DocumentGenerator {
    constructor() {}

    async generateContent(projectPath, fields) {
        const promptGenerator = new CodeDocPromptGenerator();
        promptGenerator.setProjectPath(projectPath);
        promptGenerator.setDocumentationFields(fields);
        const prompt = promptGenerator.generatePrompt();

        setPrompt(prompt);

        try {
            const response = await processPrompt();
            return response;
        } catch (error) {
            throw new Error('Failed to generate documentation content: ' + error.message);
        }
    }
}

module.exports = DocumentGenerator;
