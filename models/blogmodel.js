const mongoose = require("mongoose");

const blogschema=new mongoose.Schema(
    {
      blogname:String,
      blogauthor:String,
      blogcontent:String,
    }
  )
  
  const blogmodel=mongoose.model('blogmaster',blogschema);

  module.exports=blogmodel;
  