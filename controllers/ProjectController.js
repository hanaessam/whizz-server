const Project = require('../models/Project');

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const { path, title, description, userId } = req.body;

    // Generate the project ID by combining path and userId
    const id = `${path}_${userId}`;

    // Create a new project
    const newProject = await Project.create({
      id,
      path,
      title,
      description,
      userId,
    });

    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a project by ID
exports.updateProjectById = async (req, res) => {
  try {
    const { path, title, description, userId } = req.body;

    // Generate the project ID by combining path and userId
    const id = `${path}_${userId}`;

    const [updated] = await Project.update(
      { id, path, title, description, userId},
      { where: { id: req.params.id } }
    );

    if (updated) {
      const updatedProject = await Project.findByPk(id);
      res.status(200).json(updatedProject);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
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
