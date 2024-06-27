
async function summarize(content){
    const promptGenerator = new SummaryPromptGenerator();
    promptGenerator.setCodeSnippet(content);
    const prompt = promptGenerator.generatePrompt();
    setPrompt(prompt);
    const aiResponse = await processPrompt();
    return aiResponse;
}