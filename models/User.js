//import the Model class and DataTypes object from Sequelize
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

// create our User model
class User extends Model {
    // set up method to run on instance data (per user) to check password
    checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
    }
}

// define table columns and configuration
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4], // password must be at least 4 characters long
      },
    },
  },
  {
    hooks: {
        // set up beforeCreate lifecycle "hook" functionality
        async beforeCreate(newUserData) {
          newUserData.password = await bcrypt.hash(newUserData.password, 10); // hash the user's password before creating
          return newUserData;
        },
        // set up beforeUpdate lifecycle "hook" functionality
        async beforeUpdate(updatedUserData) {
          updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10); // hash the user's password before updating
          return updatedUserData;
        },
    },
    sequelize, // the Sequelize instance to use for this model
    freezeTableName: true, // prevent Sequelize from pluralizing the table name
    underscored: true, // use underscores instead of camelCase for column names
    modelName: "user", // use "user" as the model name in Sequelize
  }
);

module.exports = User; // export the User model for use in other parts of the application
