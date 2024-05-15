const OpenAI = require('openai')
const dotenv = require('dotenv');

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
const model = "gpt-3.5-turbo";

const openai = new OpenAI({
    apiKey: apiKey,
});

let prompt = "";

function setPrompt(newPrompt) {
    prompt = newPrompt;
}

async function processPrompt() {
    console.log("api manager working");

    try {
        const completion = await openai.createChatCompletion({
            model: model,
            messages: [{ role: "system", content: prompt }],
        });

        const response = completion.data.choices[0].message.content;
        return response;
    } catch (error) {
        console.error("Error processing prompt:", error);
        throw error;
    }
}

module.exports = {
    setPrompt,
    processPrompt,
};
