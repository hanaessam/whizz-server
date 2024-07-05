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

  parseLanguage() {
    const languageRegex = /^(\w+)/; // Matches the first word (language) in the response
    const match = languageRegex.exec(this.response);
    if (match) {
      return { language: match[1].trim() };
    } else {
      return { language: '' };
    }
  }

  parseCode() {
    const codeRegex = /```([^`]+)```/gs;
    const matches = this.response.matchAll(codeRegex);
    let code = '';

    for (const match of matches) {
      code += match[1].trim() + '\n';
    }

    // Remove the first line of the code snippet
    const codeLines = code.split('\n').slice(1).join('\n');
    return { code: codeLines };
  }

  parseUnitTests() {
    try {
      const unitTests = JSON.parse(this.response);
      return unitTests;
    } catch (error) {
      console.error('Error parsing response:', error);
      return {message: 'Error parsing response'};
    }
  }
  
  parseSwitchCodeLanguage() {
    try {
      const switchCodeLanguage = JSON.parse(this.response);
      return switchCodeLanguage;
    } catch (error) {
      console.error('Error parsing response:', error);
      return {message: 'Error parsing response'};
    }
  }


}

module.exports = ResponseParser;
