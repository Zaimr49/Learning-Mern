const dotenv=require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require('mongoose');


console.log('MONGO_URI:', process.env.MONGO_URI);



var dbFlag=mongoose.connect(process.env.MONGO_URI);
console.log("dbFlag",dbFlag)

dbFlag.then(()=>{
  console.log("Database Connected")
}).catch((error)=>{
  console.log("Error:",error)
})