const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1], // Ensures the title is not empty
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false, // Content must be provided
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: true, // Enables createdAt and updatedAt fields
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;