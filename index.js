const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");
// you must require the mongo SCHEMA before passport.js can access it.
mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  // .use is wiring up middleware, small functions used to motify information before the are sent to route handlers
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

app.get("/", (req, res) => {
  res.send("hello there.");
});
const PORT = process.env.PORT || 5000;
// process.env.PORT to recieve the Port # from Heroku
app.listen(PORT, () => {
  console.log("Server On...");
});
