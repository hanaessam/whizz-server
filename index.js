// index.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const vscodeRouter = require("./routes/vscodeRoutes");
const openaiRouter = require("./routes/openAIRoutes");
const authRoutes = require('./routes/authRoutes');
const passport = require("./auth/githubAuth");
const session = require("express-session");
const cors = require("cors");

const app = express();
const port = 8888;
app.use(express.json());

app.use(
  cors({
    origin: "*", // allow requests from any origin
    methods: ["GET", "POST"], // allow GET and POST requests
  })
);

app.use(
  session({
    secret: "keyboard",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World! This is your first web service.");
});



// Mount the router on the '/vscode' path
app.use("/vscode", vscodeRouter);
app.use("/openai", openaiRouter);
app.use(authRoutes);
// app.use("/github", githubRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});