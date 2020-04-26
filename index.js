const express = require("express"),
  app = express();

app.get("/", (req, res) => {
  res.send({ hi: "there" });
});

const PORT = process.env.PORT || 5000;
// process.env.PORT to recieve the Port # from Heroku
app.listen(PORT);
