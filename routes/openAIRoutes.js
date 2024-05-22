const express = require('express');
const OpenAIController = require("../openAI-gateway/OpenAIController");
const ChatController = require("../chat-module/ChatController");
const openaiRouter = express.Router();
// const openaiController =  OpenAIController();
const chatController = new ChatController();

const prompthandler = chatController.processInput.bind(chatController);

openaiRouter.post('/processPrompt', OpenAIController.processPrompt);
openaiRouter.post('/prompt', prompthandler);
module.exports = openaiRouter;