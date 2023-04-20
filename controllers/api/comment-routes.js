// // Import necessary dependencies
// const router = require("express").Router();
// const { Comment } = require("../../models");
// const withAuth = require("../../utils/auth");

// // GET all comments
// router.get('/', (req, res) => {
//   Comment.findAll({
//     // Specify which attributes to select
//     attributes: [
//       'id',
//       'comment_text',
//       'user_id',
//       'post_id',
//       'createdAt'
//       'username'
//     ],
//     // Sort the results in descending order by createdAt timestamp
//     order: [['createdAt', 'DESC']]
//   })
//     .then(dbCommentData => res.json(dbCommentData))
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// // POST a new comment
// router.post("/", withAuth, (req, res) => {
//   // If the user is logged in, create a new comment
//   if (req.session.loggedIn) {
//     Comment.create({
//         comment_text: req.body.comment_text,
//         post_id: req.body.post_id,
//         user_id: req.session.user_id
//         username: req.session.username
//     })
//         .then(dbCommentData => res.json(dbCommentData))
//         .catch(err => {
//             console.log(err);
//             res.status(400).json(err);
//         });
//   }
// });

// // DELETE a comment
// router.delete("/:id", withAuth, (req, res) => {
//   // Find the comment with the specified id and delete it
//   Comment.destroy({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((dbCommentData) => {
//       // If no comment was found with the specified id, send a 404 status and message
//       if (!dbCommentData) {
//         res.status(404).json({ message: "No comment found with this id!" });
//         return;
//       }
//       res.json({ message: "Comment successfully deleted!" });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// // Export the router
// module.exports = router;


// Import necessary dependencies
const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// GET all comments
router.get('/', (req, res) => {
  Comment.findAll({
    // Specify which attributes to select
    attributes: [
      'id',
      'comment_text',
      'user_id',
      'post_id',
           'createdAt'
    ],
    // Sort the results in descending order by createdAt timestamp
    order: [['createdAt', 'DESC']]
  })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST a new comment
router.post("/", withAuth, (req, res) => {
  // If the user is logged in, create a new comment
  if (req.session.loggedIn) {
    Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        user_id: req.session.user_id,
        username: req.session.username
    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
  }
});

// DELETE a comment
router.delete("/:id", withAuth, (req, res) => {
  // Find the comment with the specified id and delete it
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCommentData) => {
      // If no comment was found with the specified id, send a 404 status and message
      if (!dbCommentData) {
        res.status(404).json({ message: "No comment found with this id!" });
        return;
      }
      res.json({ message: "Comment successfully deleted!" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Export the router
module.exports = router;
