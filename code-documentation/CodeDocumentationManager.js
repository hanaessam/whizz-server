const DocumentFieldManager = require("../code-documentation/DocumentFieldManager");
const PDFGenerator = require("../code-documentation/PDFGenerator");
const DocxGenerator = require("../code-documentation/DocxGenerator");
const MarkdownGenerator = require("../code-documentation/MarkdownGenerator");
const Document = require("../code-documentation/Document");
const DocumentGenerator = require("../code-documentation/DocumentGenerator");
const fs = require("fs");
const path = require("path");

class CodeDocumentationManager {
  constructor() {}

  async generateDocumentation(documentationDetails) {
    this.document = new Document();
    this.fieldManager = new DocumentFieldManager();
    this.documentGenerator = new DocumentGenerator();

    const { fields, format, projectPath, projectSummary } =
      documentationDetails;
    if (!fields || !format || !projectPath || !projectSummary) {
      throw new Error(
        "Fields, format, projectPath, and projectSummary are required"
      );
    }

    fields.forEach((field) => {
      this.fieldManager.addField(field);
    });

    try {
      const fields = this.fieldManager.getFields();
      const content = await this.documentGenerator.generateContent(
        projectPath,
        fields,
        projectSummary
      );
      this.document.setContent(fields, content);
      const dirPath = projectPath;
      console.log("dirPath", dirPath);
      // ensure the directory exists
      if(!fs.existsSync(dirPath)) {
        await fs.promises.mkdir(dirPath, { recursive: true });
      }

      const filePath = path.join(dirPath, `documentation.${format}`);

      let generatedContent;
      if (format === "pdf") {
        const pdfGenerator = new PDFGenerator();
        generatedContent = await pdfGenerator.generate(this.document, filePath);
        return { message: "PDF documentation generated successfully." };
      } else if (format === "docx") {
        const docxGenerator = new DocxGenerator();
        generatedContent = await docxGenerator.generate(
          this.document,
          filePath
        );
        return { message: "Docx documentation generated successfully." };
      } else if (format === "md") {
        const markdownGenerator = new MarkdownGenerator();
        generatedContent = markdownGenerator.generate(this.document, filePath);
        return { message: "Markdown documentation generated successfully." };
      }
    } catch (error) {
      console.error("Error generating documentation:", error);
      throw new Error("Error generating documentation");
    }
  }
}

module.exports = CodeDocumentationManager;
