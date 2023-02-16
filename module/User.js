const mongoose = require('mongoose'); 

const UserSchema = new mongoose.Schema({
name: {
    type: String,
        required: true
    },
email: {
        type: String,
    required: true,
        unique:true
    },
number: {
        type: String,
        required:true,
        unique : true
    },
      
password: {
        type: String,
        required:true},
cpassword: {
        type: String,
        required:true}
       
});
 
const User = mongoose.model("USER", UserSchema);
module.exports = User;
