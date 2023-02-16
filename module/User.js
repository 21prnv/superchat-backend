const mongoose = require('mongoose'); 

const UserSchema = new mongoose.Schema({
name: {
    type:string,
        required: true
    },
email: {
        type:string,
    required: true,
        unique:true
    },
number: {
        type: number,
        required:true,
        unique : true
    },
      
password: {
        type:string,
        required:true},
cpassword: {
        type:string,
        required:true}
       
});
 
const User = mongoose.model("USER", UserSchema);
module.exports = User;
