
function handleSummaryRequest(req, res) {
    const filesData = req.body;

    if (!Array.isArray(filesData)) {
        return res.status(400).send('Invalid data format');
    }

    try {
        // Process each file and generate summaries
        const summaries = filesData.map(file => ({
            name: file.name,
            path: file.path,
            summary: summarizeContent(file.content)
        }));

        res.status(200).json(summaries);
    } catch (error) {
        console.error('Error processing files:', error);
        res.status(500).send('Internal server error');
    }
}

module.exports = {
    handleSummaryRequest
};