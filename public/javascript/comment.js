// const { Model, DataTypes } = require("sequelize"); // Importing the required modules
// const sequelize = require("../config/connection");

// class Comment extends Model {} // Defining a new Comment model that extends the Sequelize Model class

// Comment.init( // Initializing the Comment model with its attributes
//   {
//     id: {
//       type: DataTypes.INTEGER, // The data type for the 'id' attribute
//       allowNull: false, // This attribute is required and cannot be null
//       primaryKey: true, 
//       autoIncrement: true, 
//     },
//     username: {
//       type: DataTypes.STRING, // The data type for the 'username' attribute
//       allowNull: false, // This attribute is required and cannot be null
//     },
//     comment_text: {
//       type: DataTypes.STRING, // The data type for the 'comment_text' attribute
//       allowNull: false, // This attribute is required and cannot be null
//       validate: {
//         len: [1], // This attribute must have a length of at least 1 character
//       }
//     },
//     user_id: {
//         type: DataTypes.INTEGER, // The data type for the 'user_id' attribute
//         references: { // This attribute references the 'id' attribute in the 'user' model
//           model: 'user',
//           key: 'id'
//         }
//       },
//       post_id: {
//         type: DataTypes.INTEGER, // The data type for the 'post_id' attribute
//         references: { // This attribute references the 'id' attribute in the 'post' model
//           model: 'post',
//           key: 'id'
//         },
//         onDelete: 'cascade' // If the referenced post is deleted, this comment should be deleted as well
//       }
//   },
//   {
//     sequelize, // The Sequelize instance to use
//     // freezeTableName: true, // Optional: prevents the table name from being pluralized
//     // underscored: true, // Optional: adds underscores to column names
//     // modelName: "comment", // Optional: sets a custom model name
//   }
// );

// module.exports = Comment; // Export the Comment model for use in other files

// This function is triggered when the user submits the comment form
async function commentFormHandler(event) {
  // Prevent the default behavior of submitting the form
  event.preventDefault();

  // Get the ID of the post from the URL
  const postId = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  // Get the value of the comment input field
  const commentText = document.querySelector('#comment-text').value.trim();

  // If the comment text is not empty, send a POST request to the server to create a new comment
  if (commentText) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        post_id: postId,
        comment_text: commentText
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    // If the response is successful, reload the page to display the new comment
    if (response.ok) {
      document.location.reload();
    } 
    // Otherwise, show an alert with the status text
    else {
      alert(response.statusText);
    }
  }
}

// Add an event listener to the comment form submit button to trigger the commentFormHandler function
document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);

