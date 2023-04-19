const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Post model
class Post extends Model {}

// create fields/columns for Post model
Post.init(
    {
      // define an id column
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      // define a title column
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // define a post body column
      post_body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      // define a user id column that references the user model's id column
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      // uncomment the following lines if you want to customize table names and/or field names:
      // freezeTableName: true,
      // underscored: true,
      // modelName: 'post'
    }
);

module.exports = Post;
