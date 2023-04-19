const { Model, DataTypes } = require("sequelize"); // Importing the required modules
const sequelize = require("../config/connection");

class Comment extends Model {} // Defining a new Comment model that extends the Sequelize Model class

Comment.init( // Initializing the Comment model with its attributes
  {
    id: {
      type: DataTypes.INTEGER, // The data type for the 'id' attribute
      allowNull: false, // This attribute is required and cannot be null
      primaryKey: true, 
      autoIncrement: true, 
    },
    username: {
      type: DataTypes.STRING, // The data type for the 'username' attribute
      allowNull: false, // This attribute is required and cannot be null
    },
    comment_text: {
      type: DataTypes.STRING, // The data type for the 'comment_text' attribute
      allowNull: false, // This attribute is required and cannot be null
      validate: {
        len: [1], // This attribute must have a length of at least 1 character
      }
    },
    user_id: {
        type: DataTypes.INTEGER, // The data type for the 'user_id' attribute
        references: { // This attribute references the 'id' attribute in the 'user' model
          model: 'user',
          key: 'id'
        }
      },
      post_id: {
        type: DataTypes.INTEGER, // The data type for the 'post_id' attribute
        references: { // This attribute references the 'id' attribute in the 'post' model
          model: 'post',
          key: 'id'
        },
        onDelete: 'cascade' // If the referenced post is deleted, this comment should be deleted as well
      }
  },
  {
    sequelize, // The Sequelize instance to use
    // freezeTableName: true, // Optional: prevents the table name from being pluralized
    // underscored: true, // Optional: adds underscores to column names
    // modelName: "comment", // Optional: sets a custom model name
  }
);

module.exports = Comment; // Export the Comment model for use in other files
