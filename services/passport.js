const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users");
// const User = mongoose.model("users");<- One Argument One Argument Means we are trying to fetch something from mongoose, two means we are trying to add to it

passport.serializeUser((user, done) => {
  done(null, user.id);
  // user.id here refers to the mongodb _id keypair value
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    // monogo model dot (.) requests require .then() afterwards because it's an ansyncronus action
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // access, refresh tokens, profile and done are the returned values of OAUTH
      User.findOne({ googleID: profile.id })
        // returns a promise
        .then((existingUser) => {
          if (existingUser) {
            // do we already have a record with given profile ID?
            done(null, existingUser);
            // done() has two arguments that need to be passed, first is Error Object. Second argument is the user record ie: existingUser in the callbackfunction
          } else {
            new User({ googleID: profile.id })
              // creates a new model instance
              .save()
              // saves the new model instance
              // call .save() to automatically take the model instance and save it to the database
              .then((user) => done(null, user));
          }
        });
    }
  )
);
