const express = require('express');
const router = express.Router();
const projectController = require('../controllers/ProjectController');

// Create a new project
router.post('/project', projectController.createProject);

// Get all projects
router.get('/project', projectController.getAllProjects);

// Get a project by ID
router.get('/project/:id', projectController.getProjectById);

// Update a project summary by ID
router.put('/project/:id/summary', projectController.updateProjectSummary);

// Get a project summary by ID
router.get('/project/:id/summary', projectController.getProjectSummary);

// Delete a project by ID
router.delete('/project/:id', projectController.deleteProjectById);

module.exports = router;
