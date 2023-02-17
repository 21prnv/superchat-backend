// const { json } = require("body-parser");
const express = require("express");

const mongoose = require("mongoose");

const router = express.Router();

const User = require('../module/User');



router.post('/signup',(req,res) =>{
    console.log(req.body);
    const { name, email, number, password, cpassword } = req.body;
    if (!name || !email || !number || !password || !cpassword) {
        console.log("All Fields Are Required");
        return res.status(422).json({error: "All Fields Are Required"});
    }
    User.findOne({email:email}).then(async(saveduser)=>{
        if (saveduser) {
            console.log("user exixt");
        return res.status(422).json({error: "User exist"});
            
        }
        const user = new User({name, email, number , password, cpassword});
        try {
            await user.save().then(()=>{
                console.log("user saved succesfully");
                res.json({massage: "user saved succesfully"});
            });
        } catch (err) {
            console.log(err)
        }
    }).catch((err)=>{
        console.log(err);
    })
   
})

module.exports = router;