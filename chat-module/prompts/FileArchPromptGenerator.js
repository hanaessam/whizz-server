const PromptGenerator = require("./PromptGenerator");

class FileArchPromptGenerator extends PromptGenerator {
    constructor() {
      super();
    }
  
    setProjectName(projectName) {
      this.projectName = projectName;
    }
  
    setProjectDescription(projectDescription) {
      this.projectDescription = projectDescription;
    }
  
    setProjectFramework(projectFramework) {
      this.projectFramework = projectFramework;
    }
  
    generatePrompt() {
        this.prompt = `You are a software engineer. Create the file architecture for a new project called "${this.projectName}".\n
        The project description is: "${this.projectDescription}".\n
        The project will use the following framework: "${this.projectFramework}".\n
        Please provide the file architecture in the following JSON format, including which files are in which folders, the boilerplate code for each file, and any necessary terminal commands for setting up the project:\n
        {
          "structure": [
            {
              "type": "folder",
              "name": "folder1",
              "children": [
                {
                  "type": "file",
                  "name": "file1",
                  "content": "boilerplate code for file1"
                },
                {
                  "type": "folder",
                  "name": "subfolder1",
                  "children": [
                    {
                      "type": "file",
                      "name": "file2",
                      "content": "boilerplate code for file2"
                    }
                  ]
                }
              ]
            },
            {
              "type": "file",
              "name": "file3",
              "content": "boilerplate code for file3"
            }
          ],
          "commands": [
            "command1",
            "command2",
            "command3"
          ]
        }\n
        Ensure that the response is valid JSON and includes the necessary terminal commands that is concerned with the techonology used in the project in a clear and executable format.`;
        return this.prompt;
      }
    }
  
  module.exports = FileArchPromptGenerator;