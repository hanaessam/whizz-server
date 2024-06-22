const fs = require('fs');
const path = require('path');

// Directory where summaries will be saved (adjust as needed)
const summariesDirectory = path.join(__dirname, '..', 'models', 'summaries');

async function saveSummaryToFile(projectId, summaryContent) {
  const filePath = path.join(summariesDirectory, `${projectId}_summary.txt`);

  try {
    // Ensure the directory exists
    if (!fs.existsSync(summariesDirectory)) {
      fs.mkdirSync(summariesDirectory, { recursive: true });
    }

    // Write the summary content to the file
    fs.writeFileSync(filePath, summaryContent, 'utf8');

    return filePath;
  } catch (error) {
    throw new Error(`Error saving summary to file: ${error.message}`);
  }
}

async function getSummaryFromFile(projectId) {
  const filePath = path.join(summariesDirectory, `${projectId}_summary.txt`);

  try {
    // Check if the summary file exists
    if (fs.existsSync(filePath)) {
      return filePath;
    }
    return null;
  } catch (error) {
    throw new Error(`Error fetching summary from file: ${error.message}`);
  }
}

module.exports = {
  saveSummaryToFile,
  getSummaryFromFile,
};
