const express = require("express");
const app = express();
require("./services/passport");

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
// process.env.PORT to recieve the Port # from Heroku
app.listen(PORT, () => {
  console.log("Server On...");
});
