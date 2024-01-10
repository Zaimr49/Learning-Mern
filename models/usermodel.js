const mongoose = require("mongoose");

const userschema=new mongoose.Schema(
    {
      username:{type:String, required:true},
      useremail:{type:String, required:true},
      userpassword:{type:String, required:true},
    }
  )
  
  const usermodel=mongoose.model('usermaster',userschema);

  module.exports=usermodel;
  