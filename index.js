const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const bodyParser = require("body-parser");

require("./models/User");
require("./services/passport");
// you must require the mongo SCHEMA before passport.js can access it.
mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

app.use(
  // .use is wiring up middleware, small functions used to modify information before the are sent to route handlers
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // maxAge = how long a cookie can exsist before it expires in miliseconds
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());
// the lines from app.use(cookieSession...) to app.use(passport.session()) tells passport.js that we want it to use cookies
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js file, or main.css file
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
// process.env.PORT to recieve the Port # from Heroku
app.listen(PORT, () => {
  console.log("Server On...");
});

// to get both the express and react app servers on at the same time we will use the package concurrently -although you could run 2 cmd and start both seperately
