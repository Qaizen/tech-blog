//import required node.js modules
const path = require("path"); //manipulate file paths
const express = require("express"); //web framework for Node.js web app and API
const session = require("express-session"); //middleware for session data authentication
const exphbs = require("express-handlebars"); //view engine templating
const routes = require("./controllers"); //contains all routes

//create an instance of the Express application
const app = express();
const PORT = process.env.PORT || 3001;

// const routes = require("./controllers");
const sequelize = require("./config/connection"); //import sequelize ORM library db

//Middleware - This block of code sets up session middleware with express-session. It creates a new instance of SequelizeStore and passes the sequelize instance to it. This allows session data to be stored in the database instead of in-memory. The session configuration includes a secret (a string used to sign the session ID cookie), a store (the SequelizeStore instance), and a cookie object (which is empty, so the default options are used).
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
    //checks for session expiration every 15 minutes
    checkExpirationInterval: 15 * 60 * 1000,
    //session expires in 24 hours
    expiration: 24 * 60 * 1000,
  }),
};

app.use(session(sess));

const helpers = require("./utils/helpers"); //handlebar helpers

// This block of code sets up express-handlebars as the view engine for the application. It creates an instance of the exphbs module with helpers passed as an object containing helper functions. It then sets handlebars as the view engine and registers the exphbs instance as the engine for .handlebars files.
const hbs = exphbs.create({ helpers }); //helper variables for handlebars

app.engine("handlebars", hbs.engine);
//set handlebars as the default engine
app.set("view engine", "handlebars");

//This block of code sets up middleware for serving static files. It uses express.json() and express.urlencoded() to parse incoming request bodies, and it serves static files from the public directory using the express.static() middleware.

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//turn on routes defined in controllers module
app.use(routes);

//this block of code synchronizes the Sequelize models with the database, and then starts the server listening on the specified port. If the force option is set to true, it will drop and recreate all the database tables on startup. In this case, it is set to false, so the existing tables will not be modified. Once the synchronization is complete, it logs a message to the console indicating that the server is now listening.
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
