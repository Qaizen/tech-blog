// import required modules and models
const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// GET /users
// This route displays all the posts created by the logged-in user.
// The withAuth middleware function is used to ensure that only authenticated users can access this route.
router.get("/", withAuth, (req, res) => {
  Post.findAll({
    where: {
      // use the ID from the session
      user_id: req.session.user_id,
    },
    attributes: [
      'id',
      'title',
      'post_body',
      'createdAt'
  ],
  include: [
      {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'createdAt'],
          include: {
              model: User,
              attributes: ['username']
          }
      },
      {
          model: User,
          attributes: ['username']
      }
  ]
})
    .then((dbPostData) => {
      // serialize data before passing to template
      const post = dbPostData.map((post) => post.get({ plain: true }));
      // render the dashboard template and pass in the serialized post data
      // and the loggedIn boolean from the session object
      res.render("dashboard", { post, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});  

// GET /users/edit/:id
// This route displays the form to edit a post with a given ID.
// The withAuth middleware function is used to ensure that only authenticated users can access this route.
router.get("/edit/:id", withAuth, (req, res) => {
  Post.findOne( {
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'post_body',
      'createdAt'
  ],
  include: [
      {
          model: Comment,
          attributes: [
              'id', 'comment_text', 'post_id',
               'user_id', 'createdAt'
          ],
          include: {
              model: User,
              attributes: ['username']
          }
      },
      {
          model: User,
          attributes: ['username']
      }
  ]
})
    .then((dbPostData) => {
      // If the post exists, serialize the data and render the edit-post template.
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });

        res.render("edit-post", {
          post,
          loggedIn: true,
        });
      } else {
        // If the post does not exist, return a 404 status code.
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Export the router
module.exports = router;
