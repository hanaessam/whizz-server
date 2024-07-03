const fs = require('fs').promises; // Use promise-based fs module
const path = require('path');
const DocumentGenerator = require('./DocumentGenerator');

class MarkdownGenerator extends DocumentGenerator {
    constructor() {
        super();
        this.doc = "";
    }

    addMarkdownContent(markdown) {
        this.doc += markdown;
    }

    async generate(document, filename) {
        try {
            // Ensure directory exists
            const directory = path.dirname(filename);
            await fs.mkdir(directory, { recursive: true });

            await fs.writeFile(filename, this.doc);
            console.log("Markdown file has been created");
        } catch (error) {
            console.error("Error creating Markdown file:", error);
        }
    }
}

module.exports = MarkdownGenerator;
