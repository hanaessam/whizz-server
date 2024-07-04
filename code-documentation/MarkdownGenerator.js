const fs = require("fs").promises; // Use promise-based fs module
const path = require("path");
const DocumentGenerator = require("./DocumentGenerator");

class MarkdownGenerator extends DocumentGenerator {
  constructor() {
    super();
    this.doc = "";
  }

  addMarkdownContent(markdown) {
    this.doc += markdown;
  }

  async generate(document, filePath) {
    try {
      for (const [field, content] of Object.entries(document.getContent())) {
        this.addMarkdownContent(content);
      }

      const directory = path.dirname(filePath);
      await fs.mkdir(directory, { recursive: true });

      await fs.writeFile(filePath, this.doc);
      console.log("Markdown file has been created");
    } catch (error) {
      console.error("Error creating Markdown file:", error);
    }
  }
}

module.exports = MarkdownGenerator;
