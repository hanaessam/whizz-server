const { setPrompt, processPrompt } = require('./OpenAIManager');

const OpenAIController = {
    async processPrompt(req, res) {
        console.log("api controller working");
        setPrompt(req.body.prompt);

        try {
            const response = await processPrompt();
            console.log(response);
            res.status(200).send(response);
        } catch (error) {
            res.status(500).send("Error processing prompt");
        }
    }, 
    async test(req, res) {
        setPrompt("Hello, I am a Software Engineer.");
        try {
            const response = await processPrompt();
            console.log(response);
            res.status(200).send(response);
        } catch (error) {
            res.status(500).send("Error processing prompt");
        }
    }
};

module.exports = OpenAIController;
