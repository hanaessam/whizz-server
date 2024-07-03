const PromptGenerator = require("./PromptGenerator");

class CodeDocPromptGenerator extends PromptGenerator {
  constructor() {
    super();
    this.projectPath = "";
    this.fields = [];
    this.projectSummary = "";
  }

  setProjectPath(projectPath) {
    this.projectPath = projectPath;
  }

  setDocumentationFields(fields) {
    this.fields = fields;
  }

  setProjectSummary(projectSummary) {
    this.projectSummary = projectSummary;
  }

  generatePrompt() {
    // Aggregate summaries
    const uniqueSummaries = new Set(); // Use a Set to avoid duplicates
    this.projectSummary.forEach(summary => {
        uniqueSummaries.add(summary.content); // Add each summary content to the Set
    });

    // Convert the Set back to a string, joining each unique summary with a space for separation
    const aggregatedSummary = Array.from(uniqueSummaries).join(" ");

    // Generate the prompt with the aggregated summary and the specified fields
    const fieldsList = this.fields.join(", ");
    this.prompt = `You are a technical writer. Generate a comprehensive documentation for the project located at "${this.projectPath}".\n\n
    Project Summary: ${aggregatedSummary}\n\n
    The documentation should cover the following sections: ${fieldsList}.\n
    Please provide detailed explanations, code snippets, and any relevant information in each section.\n
    Format the response in a way that can be easily converted into a document format (PDF/DOCX).`;

    return this.prompt;
}
}

module.exports = CodeDocPromptGenerator;
