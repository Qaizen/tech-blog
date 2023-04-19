// Import the necessary modules from Sequelize
const { Model, DataTypes } = require("sequelize");

// Import the connection to the database
const sequelize = require("../config/connection");

// Define a Comment model by extending Sequelize's Model class
class Comment extends Model {}

// Initialize the Comment model by defining its attributes 
Comment.init(
  {
    // Define the id column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define the username column
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Define the comment_text column
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      }
    },
    // Define the user_id column as a foreign key that references the id column in the User model
    user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      },
    // Define the post_id column as a foreign key that references the id column in the Post model, with the onDelete option set to 'cascade'
    post_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Posts',
          key: 'id'
        },
        onDelete: 'cascade'
      }
  },
  {
    // Pass the sequelize instance to the model
    sequelize,
    // Define any additional options
    // freezeTableName: true,
    // underscored: true,
    // modelName: "comment",
  }
);

// Export the Comment model
module.exports = Comment;
