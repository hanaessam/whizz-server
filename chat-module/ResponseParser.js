class ResponseParser {
  constructor(response) {
    this.response = response;
  }

  parseFileArch() {
    try {
      const structure = JSON.parse(this.response);
      return structure;
    } catch (error) {
      console.error('Error parsing response:', error);
      return {
        structure: []
      };
    }
  }

  parseCode() {
    const codeRegex = /```([^`]+)```/g;
    const match = codeRegex.exec(this.response);
    if (match) {
      return { code: match[1].trim() };
    } else {
      return { code: '' };
    }
  }

  parseResponse() {
    const parsedCode = this.parseCode(this.response);
    return parsedCode;
  }
}

module.exports = ResponseParser;
