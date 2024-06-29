const DocumentFieldManager = require("../code-documentation/DocumentFieldManager");
const PDFGenerator = require("../code-documentation/PDFGenerator");
const DocxGenerator = require("../code-documentation/DocxGenerator");
const MarkdownGenerator = require("../code-documentation/MarkdownGenerator");
const Document = require("../code-documentation/Document");
const DocumentGenerator = require("../code-documentation/DocumentGenerator");

const path = require("path");

class CodeDocumentationManager {
  constructor() {
    this.fieldManager = new DocumentFieldManager();
    this.document = new Document();
    this.documentGenerator = new DocumentGenerator();
  }

  async generateDocumentation(documentationDetails) {
    const { fields, format, projectPath } = documentationDetails;
    if (!fields || !format || !projectPath) {
      return res.status(400).send("Fields and format are required");
    }
    
    fields.forEach((field) => {this.fieldManager.addField(field);});

    

    try {
        for (const field of this.fieldManager.getFields()) {
            const content = await this.documentGenerator.generateContent(projectPath, [field]);
            this.document.setContent(field, content);
          }
      

      const filename = path.join(
        projectPath,
        `documentation.${
          format === "pdf" ? "pdf" : format === "docx" ? "docx" : "md"
        }`
      );

      if (format === "pdf") {
        const pdfGenerator = new PDFGenerator();
        for (const [field, content] of Object.entries(this.document.getContent())) {
          pdfGenerator.addMarkdownContent(content);
        }

        await pdfGenerator.generate(this.document, filename);
        return {
          message: `PDF documentation generated successfully at ${filename}`,
        };
      } else if (format === "docx") {
        const docxGenerator = new DocxGenerator();
        for (const [field, content] of Object.entries(this.document.getContent())) {
          docxGenerator.addMarkdownContent(content);
        }
        await docxGenerator.generate(this.document, filename);

        return {
          message: `DOCX documentation generated successfully at ${filename}`,
        };
      } else if (format === "md") {
        const markdownGenerator = new MarkdownGenerator();
        for (const [field, content] of Object.entries(this.document.getContent())) {
          markdownGenerator.addMarkdownContent(content);
        }
        await markdownGenerator.generate(this.document, filename);
        return {
          message: `Markdown documentation generated successfully at ${filename}`,
        };
      }
    } catch (error) {
      console.error("Error generating documentation:", error);
      throw new Error("Error generating documentation");
    }
  }
}

module.exports = CodeDocumentationManager;