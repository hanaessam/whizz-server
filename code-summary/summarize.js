const SummaryPromptGenerator  = require('../chat-module/prompts/SummarizePromptGenerator');
const { setPrompt, processPrompt } = require('../openAI-gateway/OpenAIManager');

async function summarize(content){
    const promptGenerator = new SummaryPromptGenerator();
    promptGenerator.setCodeSnippet(content);
    const prompt = promptGenerator.generatePrompt();
    setPrompt(prompt);
    const aiResponse = await processPrompt();
    console.log("AI Response:", aiResponse);
    return aiResponse;
}

module.exports = summarize;