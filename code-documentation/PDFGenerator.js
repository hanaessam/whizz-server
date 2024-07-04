const PDFDocument = require("pdfkit");
const DocumentGenerator = require("./DocumentGenerator");
const fs = require("fs");
const { marked } = require("marked");
const { JSDOM } = require("jsdom");
const path = require("path");

class PDFGenerator extends DocumentGenerator {
  constructor() {
    super();
    this.doc = new PDFDocument();
  }

  addMarkdownContent(markdown) {
    // Convert markdown to HTML
    const htmlContent = marked.parse(markdown);

    // Parse the HTML and add to PDF
    const dom = new JSDOM(htmlContent);
    const elements = dom.window.document.body.children;

    this.parseAndRender(elements);
  }

  parseAndRender(elements) {
    for (const element of elements) {
      switch (element.tagName.toLowerCase()) {
        case "h1":
          this.doc.fontSize(24).text(element.textContent, { bold: true });
          break;
        case "h2":
          this.doc.fontSize(20).text(element.textContent, { bold: true });
          break;
        case "h3":
          this.doc.fontSize(18).text(element.textContent, { bold: true });
          break;
        case "p":
          this.doc.fontSize(12).text(element.textContent);
          break;
        case "ul":
          this.doc
            .fontSize(12)
            .list(Array.from(element.children).map((li) => li.textContent));
          break;
        default:
          this.doc.fontSize(12).text(element.textContent);
          break;
      }
      this.doc.moveDown();
    }
  }

  async generate(document, filePath) {
    const directory = path.dirname(filePath);

    console.log("heeeerreeeee in generate");
    // Ensure the directory exists
    console.log(`directory is: ${directory}`);
    await fs.promises.mkdir(directory, { recursive: true });

    // Adding logs for debugging
    console.log(`Generating PDF in directory: ${directory}`);
    console.log(`File will be saved as: ${filePath}`);

    // Add markdown content to the PDF document
    for (const [field, content] of Object.entries(document.getContent())) {
      this.addMarkdownContent(content);
    }

    const writeStream = fs.createWriteStream(filePath);
    this.doc.pipe(writeStream);
    this.doc.end();

    return new Promise((resolve, reject) => {
      writeStream.on("finish", () => {
        console.log(`PDF generation completed: ${filePath}`);
        resolve();
      });
      writeStream.on("error", (error) => {
        console.error(`Error writing PDF: ${error}`);
        reject(error);
      });
    });
  }

}

module.exports = PDFGenerator;
