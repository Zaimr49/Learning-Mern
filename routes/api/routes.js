const express = require("express");
const mongoose = require("mongoose");
const app = express();
const routes = express.Router();



routes.get("/", (req, res) => {
  // res.send("Hello World!");
  res.send("<h1>Welcome to API Routes</h1>");
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
  res.sendFile(__dirname + "/view/" + "find.html");
});


//This can use the parameters wali field from Postman
// routes.get("/findnow", (req, res) => {
//   res.send(req.query);
//   // res.send(req.query.name) //Only to get the name
//   // res.send(req.query.balance) //Only to get the balance
//   res.send("<h1>Find Process Started</h1><hr>");
// });


routes.get("/findnow", (req, res) => {
  res.send(req.query);
  // res.send(req.query.name) //Only to get the name
  // res.send(req.query.balance) //Only to get the balance
  res.send("<h1>Find Process Started</h1><hr>");
});






module.exports = routes;
