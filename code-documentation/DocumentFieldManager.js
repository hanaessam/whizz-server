class DocumentFieldManager {
    constructor() {
        this.fields = [];
    }

    addField(field) {
        this.fields.push(field);
    }

    getFields() {
        return this.fields;
    }
}

module.exports = DocumentFieldManager;
