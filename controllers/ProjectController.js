// controllers/projectController.js

const { UniqueConstraintError } = require('sequelize');
const Project = require('../models/Project');
const User = require('../models/User'); 
const { saveSummaryToFile, getSummaryFromFile } = require('../utils/fileUtils');
const fs = require('fs');

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const { path, userId } = req.body;

    // Generate the project ID by combining path and userId
    const id = `${path}_${userId}`;

    // Create a new project
    const newProject = await Project.create({
      id,
      path,
      userId,
    });

    res.status(201).json(newProject);
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      // Handle specific error for duplicate entry (path and userId)
      res.status(400).json({ error: 'Duplicate project entry. Cannot create project.' });
    } else {
      // Handle other errors
      res.status(500).json({ error: error.message });
    }
  }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      attributes: ['id', 'summaryPath'],
      include: [
        { model: User, attributes: [], as: 'user' }, // Include User model with alias 'user'
      ],
    });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, {
      attributes: ['id', 'summaryPath'],
      include: [
        { model: User, attributes: [] }, // Exclude User details from response
      ],
    });
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update project summary by ID
exports.updateProjectSummary = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { summaryContent } = req.body;

    // Find the project by ID
    const project = await Project.findByPk(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Save summary to a file and get the file path
    const summaryPath = await saveSummaryToFile(projectId, summaryContent);

    // Update the project with the new summary path
    project.summaryPath = summaryPath;
    await project.save();

    res.status(200).json({ message: 'Project summary updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get project summary by ID
exports.getProjectSummary = async (req, res) => {
  try {
    const projectId = req.params.id;

    // Get the summary file path for the project
    const summaryPath = await getSummaryFromFile(projectId);

    if (!summaryPath) {
      return res.status(404).json({ error: 'Summary not found for this project' });
    }

    // Read the summary file content
    const summaryContent = fs.readFileSync(summaryPath, 'utf8');

    res.status(200).json({ summaryContent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a project by ID
exports.deleteProjectById = async (req, res) => {
  try {
    const deleted = await Project.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
