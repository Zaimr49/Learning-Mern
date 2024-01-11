const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;


const userschema=new mongoose.Schema(
    {
      username:{type:String, required:true},
      useremail:{type:String, required:true},
      userpassword:{type:String, required:true},
    }
  )

  // this is if you are doing method 2
  userschema.pre("save",function(next){
    const hashPassword=bcrypt.hashSync(this.userpassword,saltRounds);
    this.userpassword=hashPassword;
    next();
  })
  const usermodel=mongoose.model('usermaster',userschema);

  module.exports=usermodel;
  