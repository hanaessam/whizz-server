const PDFDocument = require('pdfkit');
const fs = require('fs');
const { marked } = require('marked');
const { JSDOM } = require('jsdom');

class PDFGenerator {
    constructor() {
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
                case 'h1':
                    this.doc.fontSize(24).text(element.textContent, { underline: true });
                    break;
                case 'h2':
                    this.doc.fontSize(20).text(element.textContent, { underline: true });
                    break;
                case 'h3':
                    this.doc.fontSize(18).text(element.textContent);
                    break;
                case 'p':
                    this.doc.fontSize(12).text(element.textContent);
                    break;
                case 'ul':
                    this.doc.fontSize(12).list(Array.from(element.children).map(li => li.textContent));
                    break;
                default:
                    this.doc.fontSize(12).text(element.textContent);
                    break;
            }
            this.doc.moveDown();
        }
    }

    saveToFile(filename) {
        this.doc.pipe(fs.createWriteStream(filename));
        this.doc.end();
    }
}

module.exports = PDFGenerator;


