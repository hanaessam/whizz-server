const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Project = require('./Project'); // Import the Project model

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  githubToken: {
    type: DataTypes.STRING,
    unique: true,
  },
}, {
  // Other model options go here
});


// Define associations
User.hasMany(Project, {
  foreignKey: 'userId',
  as: 'projects', // This will create a method getProjects on the User model
});
Project.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user', // This will create a method getUser on the Project model
});

module.exports = User;
