const DocumentFieldManager = require("../code-documentation/DocumentFieldManager");
const PDFGenerator = require("../code-documentation/PDFGenerator");
const DocxGenerator = require("../code-documentation/DocxGenerator");
const MarkdownGenerator = require("../code-documentation/MarkdownGenerator");
const Document = require("../code-documentation/Document");
const DocumentGenerator = require("../code-documentation/DocumentGenerator");
const fs = require("fs").promises;
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
      return res.status(400).send("Fields and format are required");
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

      const filename = path.join(
        projectPath,
        `documentation.${
          format === "pdf" ? "pdf" : format === "docx" ? "docx" : "md"
        }`
      );

      if (format === "pdf") {
        const pdfGenerator = new PDFGenerator();
        pdfGenerator.addMarkdownContent(content);
        await pdfGenerator.generate(this.document, filename);
        return {
          message: `PDF documentation generated successfully at ${filename}`,
        };
      } else if (format === "docx") {
        const docxGenerator = new DocxGenerator();
        docxGenerator.addMarkdownContent(content);
        await docxGenerator.generate(this.document, filename);

        return {
          message: `DOCX documentation generated successfully at ${filename}`,
        };
      } else if (format === "md") {
        const markdownGenerator = new MarkdownGenerator();
        markdownGenerator.addMarkdownContent(content);
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
