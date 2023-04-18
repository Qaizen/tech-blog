// Import the necessary modules for defining the routes
const router = require("express").Router(); //express router 
const { Post, User, Comment } = require("../models"); //db operations on models

// Define the homepage route
router.get("/", (req, res) => {
  console.log(req.session); // Debugging statement to log the session object

  // Find all posts and include their associated comments and authors
  Post.findAll({
    include: [
      {
        model: Comment,
      },
      {
        model: User,
      },
    ],
  })
    .then((dbPostData) => {
      // If successful, map the post data to a plain object and render the homepage template
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("homepage", {
        posts,
        loggedIn: req.session.loggedIn, // Pass the session's loggedIn state to the template
      });
    })
    .catch((err) => {
      // If an error occurred, log the error and send a 500 response
      console.log(err);
      res.status(500).json(err);
    });
});

// Define the single post route
router.get("/post/:id", (req, res) => {
  // Find a post by its id and include its associated author and comments with their associated authors
  Post.findOne({
    where: {
      id: req.params.id,
    },

    include: [
      User,
      {
        model: Comment,
        include: {
          model: User,
        },
      },
    ],
  })
    .then((dbPostData) => {
      // If successful, render the single-post template with the post data and the session's loggedIn state
      if (!dbPostData) {
        // If no post was found with the given id, send a 404 response
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      const post = dbPostData.get({ plain: true });
      console.log(post);
      res.render("single-post", {
        post,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      // If an error occurred, log the error and send a 500 response
      console.log(err);
      res.status(500).json(err);
    });
});

// Define the login page route
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    // If the user is already logged in, redirect to the homepage
    res.redirect("/");
    return;
  }
  // Otherwise, render the login template
  res.render("login");
});

// Define the signup page route
router.get("/signup", (req, res) => {
  // Render the signup template
  res.render("signup");
});

// Export the router
module.exports = router;
