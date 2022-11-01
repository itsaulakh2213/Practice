const express = require('express');
const connectToMongoose = require('./config/db');
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleWare/error");

//UncaughtException error

process.on("uncaughtException", (err) => {
  console.log(`error : ${err.message}`);
  console.log("uncaughtException error shutting down");
  process.exit(1);
});

const app = express();

app.use(express.json());
app.use(cookieParser());

require('dotenv').config();

app.use('/api', require('./routes/userRoute'));
app.use('/api', require('./routes/productRoute'));

app.use(errorMiddleware);

connectToMongoose();

app.listen(process.env.PORT, ()=>{
    console.log(`server listening on ${process.env.PORT}`);
})

process.on("unhandledRejection", (err) => {
    console.log(`error : ${err.message}`);
    console.log("shutting down");
  
    server.close(() => {
      process.exit(1);
    });
  });

