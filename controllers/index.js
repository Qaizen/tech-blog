// Import the required packages and route files
const router = require('express').Router(); //creates new router object
const apiRoutes = require('./api'); //import routes form api
const homeRoutes = require('./home-routes.js'); /
const dashboardRoutes = require('./dashboard-routes.js');

// Define the routes
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

// If no route is matched, return a 404 status code
router.use((req, res) => {
    res.status(404).end();
});

// Export the router object as a module fo ruse in other parts 
module.exports = router;
