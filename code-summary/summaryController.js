const summarizeContent = require('./summarize');

async function handleSummaryRequest(req, res) {
    const {filesData, userId} = req.body;
    console.log('User ID:', userId);
    console.log('Files data:', filesData);
    if (!Array.isArray(filesData)) {
        return res.status(400).send('Invalid data format');
    }

    try {
        // Process each file and generate summaries
        const summaries = await Promise.all(filesData.map(async (file) => ({
            name: file.name,
            path: file.path,
            content: await summarizeContent(file.content , userId)
        })));

        res.status(200).json(summaries);
    } catch (error) {
        console.error('Error processing files:', error);
        res.status(500).send('Internal server error');
    }
}

module.exports = handleSummaryRequest;
