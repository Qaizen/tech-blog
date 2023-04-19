const withAuth = (req, res, next) => {
    // Check if user is not logged in
    if (!req.session.user_id) {
      // Redirect user to login page
      res.redirect('/login');
    } else {
      // User is logged in, continue to next middleware or route handler
      next();
    }
  };
  
  module.exports = withAuth;

  
// This is a middleware function called withAuth that checks if the user is authenticated before allowing them to access certain routes. The function takes three parameters: the request object (req), the response object (res), and a next function that allows the request to proceed to the next middleware function or route handler.

// Inside the function, we check if the user is logged in by checking if req.session.user_id exists. If it doesn't, we redirect the user to the login page (/login). If the user is logged in, we call the next function to continue processing the request. Finally, we export the withAuth function so it can be used in other parts of the application.