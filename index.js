const express = require('express');
const app = express();
const port = 8888; 

// Define a route
app.get('/', (req, res) => {
    res.send('Hello World! This is your first web service.');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
