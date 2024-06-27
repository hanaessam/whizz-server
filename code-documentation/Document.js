class Document {
    constructor() {
        this.content = {};
    }

    setContent(field, content) {
        this.content[field] = content;
    }

    getContent() {
        return this.content;
    }
}

module.exports = Document;
