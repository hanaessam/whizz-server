const { Document, Packer, Paragraph } = require('docx');
const fs = require('fs');

class DocxGenerator {
    constructor() {
        this.doc = new Document();
    }

    addContent(text) {
        const paragraph = new Paragraph(text);
        this.doc.addSection({ children: [paragraph] });
    }

    async saveToFile(filename) {
        const b64string = await Packer.toBase64String(this.doc);
        fs.writeFileSync(filename, b64string, 'base64');
    }
}

module.exports = DocxGenerator;