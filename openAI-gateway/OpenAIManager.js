const OpenAI = require('openai');
const dotenv = require('dotenv');
const User = require('../models/User');
const { use } = require('../routes/userRoutes');

dotenv.config();

const organization = process.env.OPENAI_ORGANIZATION_ID;
const project = process.env.OPENAI_PROJECT_ID;

const model = "gpt-3.5-turbo";



let prompt = "";

function setPrompt(newPrompt) {
    prompt = newPrompt;
}

async function setKey(userId) {
    try {
        console.log(`Looking for user with ID: ${userId}`);
        const user = await User.findByPk(userId);

        if (!user) {
            throw new Error(`User not found with ID: ${userId}`);
        }

        const key = user.openAiKey;

        if (!key) {
            throw new Error(`OpenAI key not found for user with ID: ${userId}`);
        }
        return key;
    } catch (error) {
        console.error("Error in setKey function:", error);
        throw error;
    }
}


async function processPrompt(userId) {
    console.log("API manager working");
    const key = await setKey(userId)
    console.log("KEEYY FROM DB:", key);
    const openai = new OpenAI({
        apiKey: key,
    });

    try {
        const completion = await openai.chat.completions.create({
            model: model,
            messages: [{ role: "system", content: prompt }],
        });
        if (completion && completion.choices && completion.choices.length > 0) {
            const gptresponse = completion.choices[0].message.content;
            console.log(gptresponse);
            return gptresponse;
        } else {
            throw new Error("Invalid or Expired OpenAI Key");
        }
    } catch (error) {
        console.error("Error processing prompt:", error);
        throw error;
    }
}

module.exports = {
    setPrompt,
    setKey,
    processPrompt,
};
