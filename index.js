// index.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const vscodeRouter = require("./routes/vscodeRoutes");
const openaiRouter = require("./routes/openAIRoutes");
const authRoutes = require('./routes/authRoutes');
const passport = require("./auth/githubAuth");
const session = require("express-session");

const app = express();
const port = 8888;

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

app.use("/vscode", vscodeRouter);
app.use("/openai", openaiRouter);
app.use(authRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});