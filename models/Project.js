const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User'); // Import the User model to establish the relationship

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.STRING, // Use STRING type for the id
    primaryKey: true,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  summaryPath:{
    type: DataTypes.STRING,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // Reference to the User model
      key: 'id',
    },
  },
}, {
  // Other model options go here
});

module.exports = Project;
