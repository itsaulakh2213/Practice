const express = require('express');
const connectToMongoose = require('./config/db');
const app = express();

app.use(express.json());
require('dotenv').config();

app.use('/api', require('./routes/userRoute'));

connectToMongoose();

app.listen(process.env.PORT, ()=>{
    console.log(`server listening on ${process.env.PORT}`);
})

