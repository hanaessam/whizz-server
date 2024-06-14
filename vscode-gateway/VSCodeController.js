class VSCodeController {
  constructor() {
    this.highlightedCode = "";
  }

  getHighlightedCode(req, res) {
    this.highlightedCode = req.body.highlightedCode;
    console.log("Highlighted text received:", this.highlightedCode);
    res.status(200).send(this.highlightedCode);
  }

  generateProjectStructure(description) {
    // Logic to generate project structure
    return {
      folders: ["src", "test", "docs"],
      files: {
        "src/index.js": 'console.log("Hello, world!");',
        "README.md": "# Project\nThis is a generated project.",
      },
    };
  }

  
}

module.exports = VSCodeController;
