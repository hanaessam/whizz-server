class ResponseParser {
    constructor(response) {
        this.response = response;
    }

    parseFileArch() {
        // Example parsing logic (you'll need to adjust this based on the actual response format from OpenAI)
        const structure = {
          folders: [],
          files: {}
        };
    
        // Assuming the response is a simple newline-separated list of files and folders
        const lines = this.response.split('\n');
        for (const line of lines) {
          if (line.startsWith('Folder:')) {
            structure.folders.push(line.replace('Folder:', '').trim());
          } else if (line.startsWith('File:')) {
            const filePath = line.replace('File:', '').trim();
            structure.files[filePath] = ''; // Placeholder content, you might want to define default content for files
          }
        }
    
        return structure;
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

    parseResponse() {
      const parsedCode = this.parseCode(this.response);
      return parsedCode;
   
  }
}

module.exports = ResponseParser;