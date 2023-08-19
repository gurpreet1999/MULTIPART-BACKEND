require('dotenv').config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const movieRoute=require("./routes/MovieRoute")
const bodyParser = require('body-parser');
const cors=require('cors')

console.log(process.env)
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });


  app.use(cors({
    origin:"http://video-streaming-app-delpoy.s3-website.ap-south-1.amazonaws.com"
  }))
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://video-streaming-app-delpoy.s3-website.ap-south-1.amazonaws.com');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use("/api",movieRoute );


app.listen(process.env.PORT, () => {
    console.log(`Backend server is running AT ${process.env.PORT}`);
  });