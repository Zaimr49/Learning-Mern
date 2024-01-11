const express = require("express");
const mongoose = require("mongoose");
const routes = express.Router();
const path = require("path");

//Needed when we want to save something using the Post Method
const bodyParser = require("body-parser");
const app = express();

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: true });



////User Routes
//Save New User
//Login Old User

const usercontroller = require(path.join(
    __dirname,
    "../controllers/usercontroller.js"
  ));
  
  //Display New User Form
  routes.get("/newuserform", usercontroller.newuserformFunc);
  
  //Save New User
  routes.post("/newusersave",urlencodedParser ,usercontroller.newusersaveFunc);
  
  //Check User
  routes.post("/checkuser",urlencodedParser,usercontroller.checkuser)
  
  
  
  //Earlier Practice
  
  // const usermodel = mongoose.model("usermaster", {
  //   username: String,
  //   password: String,
  // });
  
  // routes.post("/saveuser", (req, res) => {
  //   // const newuser=usermodel({username:'',password:""})
  //   const newuser = usermodel(req.query);
  
  //   newuser
  //     .save()
  //     .then(() => {
  //       console.log("New User Saved ....");
  //     })
  //     .catch((error) => {
  //       console.log("User Save Process Failed" + error);
  //     });
  //   res.send(req.query);
  // });
  
  
  
  
  
  
  module.exports = routes;
  