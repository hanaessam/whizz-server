// index.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const vscodeRouter = require("./routes/vscodeRoutes");
const openaiRouter = require("./routes/openAIRoutes");
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes.js');
const passport = require("./auth/githubAuth");
const gihtubAuthRoutes = require('./routes/githubAuthRoutes.js');
const localAuthRoutes = require('./routes/localAuthRoutes.js');
// const summaryRoutes = require('./routes/summaryRoutes.js');
const session = require("express-session");
const cors = require("cors");
const sequelize = require('./config/database');




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
// app.use("", summaryRoutes);
app.use("", userRoutes);
app.use("", projectRoutes);
app.use(gihtubAuthRoutes);
app.use(localAuthRoutes);


const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

const startServer = async () => {
  // //connect to database  
  testConnection();
  await sequelize.authenticate();
  await sequelize.sync();

  // start server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

};

startServer();

