 // Protect dashboard route (requires authentication)
 app.get("/dashboard", ensureAuthenticated, (req, res) => {
    res.send("Welcome to the dashboard, " + req.user.username + "!");
  });

// Registration route
app.post("/register", (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    newUser.save((err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Registration failed" });
      } else {
        res.status(200).json({ message: "Registration successful" });
      }
    });
  });
  
  // Login route
  app.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/login",
      failureFlash: true,
    })
  );
  
  // Logout route
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

 // Define a route handler for the root ("/") route
app.get("/", (req, res) => {
    res.send("Welcome to the Stock Tracker App!"); // Send a simple response
  });

  
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  }
  