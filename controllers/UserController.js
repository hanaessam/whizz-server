const User = require('../models/User');


exports.createUser = async (req, res) => {
  try {
    const { username, email, password, githubToken } = req.body;

    // Validate input
    if (!((email && password) || githubToken)) {
      return res.status(400).json({ error: 'You must provide either email and password or a GitHub token.' });
    }

    // Create a new user
    const newUser = await User.create({ username, email, password, githubToken });
    // Return a sanitized response (exclude password)
    const sanitizedUser = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };
    res.status(201).json(sanitizedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.findAll({
      attributes: { exclude: ['password', 'githubToken'] } // Exclude sensitive fields
    });

    // Return sanitized response (exclude sensitive fields)
    const sanitizedUsers = users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));

    res.status(200).json(sanitizedUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    // Return a sanitized response (exclude password)
    const sanitizedUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    if (user) {
      res.status(200).json(sanitizedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a user by ID
exports.updateUserById = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const [updated] = await User.update(
      { username, email, password },
      { where: { id: req.params.id } }
    );
    if (updated) {
      const updatedUser = await User.findByPk(req.params.id);
      sanitizedUser = {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      };
      res.status(200).json(sanitizedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a user by ID
exports.deleteUserById = async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
