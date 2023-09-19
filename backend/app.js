const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const jobsRoutes = require("./routes/jobs");
const invoiceRoutes = require("./routes/invoice");



const app = express();

mongoose
.connect(
  "mongodb+srv://jermain:" + 
  process.env.MONGO_ATLAS_PW +
   "@cluster0.q16uh.mongodb.net/aacleaning?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use("/images", express.static(path.join(__dirname, "images")));
// app.use("/videos", express.static(path.join(__dirname, "videos")));
app.use("/", express.static(path.join(__dirname, "angular")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/jobs", jobsRoutes); 
app.use("/api/invoice", invoiceRoutes); 
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "angular", "index.html"));
});

module.exports = app;
