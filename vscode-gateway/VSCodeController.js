class VSCodeController {
    constructor() {
        this.highlightedCode = "";
    }

    getHighlightedCode(req, res) {
        this.highlightedCode = req.body.highlightedCode;
        console.log('Highlighted text received:', this.highlightedCode);
        res.status(200).send('Received highlighted text successfully.');
    }


}

module.exports = VSCodeController;