// This module serves as a means to collect all of the API routes and package them up 
const router = require('express').Router();

// Importing user, post, and comment routes
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

// Middleware function add user routes to the router
router.use('/users', userRoutes);

// Middleware function add post routes to the router
router.use('/posts', postRoutes);

// Middleware function add comment routes to the router
router.use('/comments', commentRoutes);

// Exporting the router module
module.exports = router;
