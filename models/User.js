const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleID: String,
});

mongoose.model("users", userSchema);
// mongoose.model('users'<- This is the collection, userSchema <- this is the Schema Model defined above)
