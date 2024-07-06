const SummaryPromptGenerator  = require('../chat-module/prompts/SummarizePromptGenerator');
const { setPrompt, processPrompt } = require('../openAI-gateway/OpenAIManager');

async function summarize(content , userId) {
    const wordLimit = 3896; // Adjust the word limit as needed

    // Split content into words
    const words = content.split(/\s+/);

    // Limit content to wordLimit words
    const limitedContent = words.slice(0, wordLimit).join(" ");

    const promptGenerator = new SummaryPromptGenerator();
    promptGenerator.setCodeSnippet(limitedContent);
    const prompt = promptGenerator.generatePrompt();
    setPrompt(prompt);

    const aiResponse = await processPrompt(userId);
    console.log("AI Response:", aiResponse);
    return aiResponse;
}

module.exports = summarize;