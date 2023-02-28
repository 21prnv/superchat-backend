const express = require("express");

const port = process.env.port || 3000;
const cors = require("cors");

const app = express();
const bodyParser = require("body-parser");
app.use(cors());
app.use(express.static("public"));
require("./db");

const authRoutes = require("./routs/RegisterRoute");

app.use(bodyParser.json());
app.use(authRoutes);
app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, (req, res) => {
  console.log(`connected on ${port}`);
});
