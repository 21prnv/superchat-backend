const express = require("express");

const port = process.env.port || 3000;

const app = express();
const bodyParser = require("body-parser");

require("./db");


app.get('/',(req,res)=>{
    res.send('hello');
})


app.listen(port, (req, res)=>{
    console.log(`connected on ${port}`);
});

