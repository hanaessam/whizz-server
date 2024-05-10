class ResponseParser {
    constructor(response) {
        this.response = response;
    }

    parseFileArch(message) {
     
    }

    parseCode(message) {
        const codeRegex = /```([^`]+)```/g;
        const match = codeRegex.exec(message);
        if (match) {
            return { code: match[1].trim() };
        } else {
            return { code: '' };
        }
    }
}

module.exports = ResponseParser;