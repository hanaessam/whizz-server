const express = require('express');

const bodyParser = require('body-parser');
const VSCodeController = require('./vscode-gateway/VSCodeController');

const app = express();
const port = 8888; 
const vscodeController = new VSCodeController();
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

// Mount the router on the '/vscode' path
app.use('/vscode', vscodeRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});