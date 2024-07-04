const fs = require("fs").promises; // Use promise-based fs module
const DocumentGenerator = require("./DocumentGenerator");
const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require("docx");
const { marked } = require("marked");
const { JSDOM } = require("jsdom");
const path = require("path");

class DocxGenerator extends DocumentGenerator {
  constructor() {
    super();
    this.doc = new Document({
      sections: [
        {
          properties: {},
          children: [],
        },
      ],
    });
    // Ensure the sections array is initialized
    if (!this.doc.sections) {
      this.doc.sections = [
        {
          properties: {},
          children: [],
        },
      ];
    }
    this.currentSection = this.doc.sections[0];
  }

  addMarkdownContent(markdown) {
    const htmlContent = marked.parse(markdown);
    const dom = new JSDOM(htmlContent);
    const elements = dom.window.document.body.children;

    for (const element of elements) {
      let paragraph;
      switch (element.tagName.toLowerCase()) {
        case "h1":
          paragraph = new Paragraph({
            text: element.textContent,
            heading: HeadingLevel.HEADING_1,
          });
          break;

        case "h2":
          paragraph = new Paragraph({
            text: element.textContent,
            heading: HeadingLevel.HEADING_2,
          });
          break;
        case "h3":
          paragraph = new Paragraph({
            text: element.textContent,
            heading: HeadingLevel.HEADING_3,
          });
          break;
        case "h4":
          paragraph = new Paragraph({
            text: element.textContent,
            heading: HeadingLevel.HEADING_4,
          });
          break;
        case "p":
          paragraph = new Paragraph(element.textContent);
          break;
        case "ul":
          Array.from(element.children).forEach((li) => {
            this.currentSection.children.push(
              new Paragraph({
                text: li.textContent,
                bullet: { level: 0 },
              })
            );
          });
          continue;
        case "ol":
          Array.from(element.children).forEach((li, index) => {
            this.currentSection.children.push(
              new Paragraph({
                text: li.textContent,
                numbering: {
                  level: 0,
                  custom: true,
                  format: "decimal",
                  start: index + 1,
                },
              })
            );
          });
          continue;
        default:
          paragraph = new Paragraph(element.textContent);
          break;
      }
      this.currentSection.children.push(paragraph);
    }
  }

  async generate(document, filePath) {
    try {
      for (const [field, content] of Object.entries(document.getContent())) {
        this.addMarkdownContent(content);
      }

      this.doc.addSection(this.currentSection); // Add the accumulated section to the document

      const buffer = await Packer.toBuffer(this.doc);

      // Ensure directory exists
      const directory = path.dirname(filePath);
      await fs.mkdir(directory, { recursive: true });

      await fs.writeFile(filePath, buffer);
      console.log("Document generated successfully.");
    } catch (error) {
      console.error("Error generating document:", error);
    }
  }

  async generateBuffer(markdownContent) {
    // returns document content as buffer
    this.addMarkdownContent(markdownContent);
    this.doc.addSection(this.currentSection);
    return await Packer.toBuffer(this.doc);
  }
}

module.exports = DocxGenerator;
