var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  email: String
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
