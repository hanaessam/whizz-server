const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const GitHubAuth = require("./github-oauth/GitHubOAuth");
const vscodeRouter = require('./routes/vscodeRoutes');
const openaiRouter = require('./routes/openAIRoutes');

// Create an instance of the express server
const app = express();
const port = 8888;

// Initialize express session
app.use(session({
    secret: 'any string',
    resave: false,
    saveUninitialized: true,
}));

// Middleware to parse JSON request body
app.use(bodyParser.json());

// Github OAuth setup
const gitHubAuth = new GitHubAuth(app);
gitHubAuth.initialize();
gitHubAuth.setupGitHubStrategy();
gitHubAuth.setupGitHubRoutes();
gitHubAuth.getUserProfile();

// Define init route
app.get("/", (req, res) => {
  res.send("Hello World! This is your first web service.");
});

app.use("/vscode", vscodeRouter);
app.use("/openai", openaiRouter);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});