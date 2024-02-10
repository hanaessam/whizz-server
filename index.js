const express = require('express');

const bodyParser = require('body-parser');
const VSCodeController = require('./vscode-gateway/VSCodeController');
const openAiController = require('./openAI-gateway/OpenAIController');
const ChatController = require('./chat-module/ChatController');
const app = express();
const port = 8888;
const vscodeController = new VSCodeController();
const openaiController = new openAiController();
const chatController = new ChatController();
// Middleware to parse JSON request body
app.use(bodyParser.json());


// Define init route
app.get('/', (req, res) => {
    res.send('Hello World! This is your first web service.');
});

// Create an instance of the controller class
const vscodeRouter = express.Router();

// Bind the controller method to the controller instance
const getHighlightedCodeHandler = vscodeController.getHighlightedCode.bind(vscodeController);

// Define the endpoint routes for vscode controller
vscodeRouter.post('/highlight', getHighlightedCodeHandler);

// Create an instance of the controller class
const openaiRouter = express.Router();

// Bind the openai controller method to the controller instance
const processPromptHandler = openaiController.processPrompt.bind(openaiController);

// Define the endpoint routes for api controller
openaiRouter.post('/processPrompt', processPromptHandler);

// Bind the openai controller method to the controller instance
const fixcodehandler = chatController.processInput.bind(chatController);

// Define the endpoint routes for api controller
openaiRouter.post('/fixcode', fixcodehandler);

// Mount the router on the '/vscode' path
app.use('/vscode', vscodeRouter);
app.use('/openai', openaiRouter);


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);

});


