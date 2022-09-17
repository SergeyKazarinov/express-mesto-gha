const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


const PORT = process.env.PORT;

mongoose.connect("mongodb://localhost:27017/mestodb");
const app = express();

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  });
