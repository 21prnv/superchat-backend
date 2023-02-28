const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
});
UserSchema.pre("save", async function (next) {
  const user = this;
  console.log("before saving", user.password);
  if (!user.isModified("password")) {
    return next();
  }
  user.password = await bcrypt.hash(user.password, 8);
  console.log("after saving", user.password);
  next();
});
const User = mongoose.model("USER", UserSchema);
module.exports = User;
