const OpenAI = require('openai');
const dotenv = require('dotenv');

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
const organization = process.env.OPENAI_ORGANIZATION_ID;
const project = process.env.OPENAI_PROJECT_ID;

const model = "gpt-3.5-turbo";

const openai = new OpenAI({
    apiKey: apiKey,
    organization: organization,
    project: project,
});

let prompt = "";

function setPrompt(newPrompt) {
    prompt = newPrompt;
}

async function processPrompt() {
    console.log("API manager working");

    try {
        const completion = await openai.chat.completions.create({
            model: model,
            messages: [{ role: "system", content: prompt }],
        });

        // console.log("OpenAI API Response:", completion);

        if (completion && completion.choices && completion.choices.length > 0) {
            const response = completion.choices[0].message.content;
            return response;
        } else {
            throw new Error("Unexpected response structure from OpenAI API");
        }
    } catch (error) {
        console.error("Error processing prompt:", error);
        throw error;
    }
}

module.exports = {
    setPrompt,
    processPrompt,
};
