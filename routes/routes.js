const express = require("express");
const mongoose = require("mongoose");
const routes = express.Router();
const path = require("path");

//Needed when we want to save something using the Post Method
const bodyParser = require("body-parser");
const app = express();

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: true });

require(path.join(__dirname, "../database/dbconnect.js"));

// No use ab kyunke routes controller ko call karein gae instead of directly model ko, yeh ab sirf controllers mae call ho ga
// const blogmodel = require(path.join(__dirname, "../models/blogmodel"));
// uper wale ke jagah ab d
const blogcontroller = require(path.join(__dirname, "../controllers/blogcontroller"));

routes.get("/", (req, res) => {
  // res.send("Hello World!");
  // res.send("<h1>Welcome to API Routes</h1>");

  // Now we are using the handlebars / view engine
  // res.render("home")

  res.render("home", {
    title1: "<u>HOME PAGE TITLE</u>",
    title2: "<u>HOME PAGE TITLE</u>",
    author: "Blog Author",
    publish: true,
    blogs:[
      'Blog1',
      'Blog2',
      'Blog3',
      'Blog4',
      'Blog5',
    ]
  });
});

routes.get("/about", (req, res) => {
  res.json([
    {
      project_name: "project1",
      project_link: "Rest APIs",
    },
    {
      project_name: "project2",
      project_link: "Rest APIs",
    },
  ]);
});

routes.get("/singleData", (req, res) => {
  res.json({ name: "ali", balance: 10000 });
});
routes.get("/allData", (req, res) => {
  res.json([
    { name: "ali", balance: 10000 },
    { name: "ahmed", balance: 30000 },
  ]);
});
routes.get("/find", (req, res) => {
  // res.sendFile(__dirname + "/view/" + "find.html");
  res.sendFile(path.join(__dirname, "..", "view", "find.html"));
});
routes.get("/saveblogpage", (req, res) => {
  // res.sendFile(path.join(__dirname,'..','view','saveblog.html'));

  //Now we are using handlebars
  res.render("saveblog");
});
routes.get("/findnow", (req, res) => {
  res.send(req.query);
  // res.send(req.query.name) //Only to get the name
  // res.send(req.query.balance) //Only to get the balance
  res.send("<h1>Find Process Started</h1><hr>");
});

routes.get("/users", (req, res) => {
  usermodel
    .find({})
    .then((users) => {
      res.json(users);
      // res.send(users); //same as above
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});


// blogmodel --> ki wajah sae yeh nahi chaley ga
// routes.get("/blogs", (req, res) => {
//   blogmodel
//     .find({})
//     .then((data) => {
//       // res.json(data);
//       console.log(data);
//       // Convert each document to a plain object
//       //The issue you're experiencing with Handlebars, as indicated by the error message, arises from Handlebars' security model which restricts access to properties that are not own properties of the object. This often occurs when using Mongoose, as the objects returned from queries include methods and properties inherited from Mongoose's document prototype.
//       const blogs = data.map(doc => doc.toObject());
//       res.render("showblogs",{rowBlogs:blogs});
//     })
//     .catch((err) => {
//       res.status(500).send(err);
//     });
// });

//Uper wali ki jagah ham yeh karein gae:
routes.get("/blogs",blogcontroller.showBlogs)








const usermodel = mongoose.model("usermaster", {
  username: String,
  password: String,
});

routes.post("/saveuser", (req, res) => {
  // const newuser=usermodel({username:'',password:""})
  const newuser = usermodel(req.query);

  newuser
    .save()
    .then(() => {
      console.log("New User Saved ....");
    })
    .catch((error) => {
      console.log("User Save Process Failed" + error);
    });
  res.send(req.query);
});

// routes.get("/saveblog",(req,res)=>{
//   const newblog=blogmodel(req.query);
//   console.log(req.query)

//   newblog.save().then(()=>{
//     console.log("New Blog Saved...");
//   }).catch((error)=>{
//     console.log("New Blog Saved Process Failed, Error:"+error);
//   })

//   res.send(req.query);
// })

//Agar post use karna hai toh middleware use karna hota hai
routes.post("/saveblog", urlencodedParser, blogcontroller.createBlog);

module.exports = routes;
