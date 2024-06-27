const DocumentGenerator = require('./DocumentGenerator');
const fs = require('fs');

class MarkdownGenerator extends DocumentGenerator {
    constructor() {
        super();
        this.doc = "";
    }

    
    addMarkdownContent(markdown) {
        this.doc += markdown;
    }

    async generate(document, filename){
        fs.writeFile(filename, this.doc, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("Markdown File has been created");
        });
    }
}

module.exports = MarkdownGenerator;