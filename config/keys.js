// keys.js - figure out what set of credentials to return
if (process.env.NODE_ENV === "production") {
  //we are in production - return the prod set of keys
  module.exports = require("./prod");
} else {
  //we are in development -return the dev keys
  module.exports = require("./dev");
}

// mongoProdURI: "mongodb+srv://bleighton-prod:9SEAva92iEPQWe7@cluster0-dzhjw.mongodb.net/test?retryWrites=true&w=majority",
// googleprodAPIkey: AIzaSyD6mCZsxX0hMYQ6apuwhvDQ4jFemu0Mp2c
