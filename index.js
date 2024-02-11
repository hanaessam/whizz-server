const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const VSCodeController = require("./vscode-gateway/VSCodeController");
const openAiController = require("./openAI-gateway/OpenAIController");
const ChatController = require("./chat-module/ChatController");
const GitHubAuth = require("./github-oauth/GitHubOAuth");
// Create an instance of the express server
const app = express();
const port = 8888;

// Initialize express session
app.use(session({
    secret: 'any string',
    resave: false,
    saveUninitialized: true,
  }));

// Github OAuth setup
const gitHubAuth = new GitHubAuth(app);
gitHubAuth.initialize();
gitHubAuth.setupGitHubStrategy();
gitHubAuth.setupGitHubRoutes();
gitHubAuth.getUserProfile();

const vscodeController = new VSCodeController();
const openaiController = new openAiController();
const chatController = new ChatController();
// Middleware to parse JSON request body
app.use(bodyParser.json());

// Define init route
app.get("/", (req, res) => {
  res.send("Hello World! This is your first web service.");
});

// Create an instance of the controller class
const vscodeRouter = express.Router();

// Bind the controller method to the controller instance
const getHighlightedCodeHandler =
  vscodeController.getHighlightedCode.bind(vscodeController);

// Define the endpoint routes for vscode controller
vscodeRouter.post("/highlight", getHighlightedCodeHandler);

// Create an instance of the controller class
const openaiRouter = express.Router();

// Bind the openai controller method to the controller instance
const processPromptHandler =
  openaiController.processPrompt.bind(openaiController);

// Define the endpoint routes for api controller
openaiRouter.post("/processPrompt", processPromptHandler);

// Bind the openai controller method to the controller instance
const prompthandler = chatController.processInput.bind(chatController);

// Define the endpoint routes for api controller
openaiRouter.post("/prompt", prompthandler);

// Mount the router on the '/vscode' path
app.use("/vscode", vscodeRouter);
app.use("/openai", openaiRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
