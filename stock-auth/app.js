const express = require("express");
const session = require("express-session");
const passport = require("passport");

const app = express();


// Define a route handler for the root ("/") route
app.get("/", (req, res) => {
  res.send("Welcome to the Stock Tracker App!"); // Send a simple response
});

// Middleware setup (e.g., bodyParser, static file serving, etc.)
// ...

// Serve static files from the "public" directory
app.use(express.static("public"));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
