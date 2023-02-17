const mongoose = require("mongoose");

require("dotenv").config();

mongoose
  .connect(process.env.mongo_URL)
  .then((req, res) => {
    console.log("connect to database");
  })
  .catch((err) => {
    console.log("Could not connect to database" + err);
  });
