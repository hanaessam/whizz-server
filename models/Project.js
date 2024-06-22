const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User'); // Import User model

class Project extends Model {}

Project.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  summaryPath: {
    type: DataTypes.STRING,
    allowNull: true, // Assuming summaryPath can be nullable if summary is not provided initially
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
  sequelize,
  modelName: 'Project',
  timestamps: true,
  underscored: true,
});

// Define associations
Project.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = Project;
