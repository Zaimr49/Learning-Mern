const path = require("path");
const usermodel = require(path.join(__dirname, "../models/usermodel"));

exports.newuserformFunc=(req,res)=>{
    res.render("newuserform")
}


exports.newusersaveFunc = (req, res) => {
  const newUser = usermodel(req.body);
  newUser
    .save()
    .then((data) => {
      console.log(data);
      console.log("New User Saved");
    })
    .catch((error) => {
      console.log("New User Not Saved, Error:" + error);
    });
    res.redirect('/'); 
};
