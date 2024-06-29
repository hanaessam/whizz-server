
function extractCodeInLanguage( code) {
    const lines = code.split('\n');

    // Define a regex pattern to match lines starting with !, @, `, %, ^, or *
    const pattern = /^[!@`%^*]/;

    const filteredLines = lines.filter(line => !pattern.test(line));

    return filteredLines.join('\n');
}

module.exports = extractCodeInLanguage;