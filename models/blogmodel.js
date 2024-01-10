const mongoose = require("mongoose");

// const blogschema=new mongoose.Schema(
//     {
//       blogname:String,
//       blogauthor:String,
//       blogcontent:String,
//     }
//   )
const blogschema=new mongoose.Schema(
    {
      blogname:{type:String, required:true},
      blogauthor:{type:String, required:true},
      blogcontent:{type:String, required:true},
    }
  )
  
  const blogmodel=mongoose.model('blogmaster',blogschema);

  module.exports=blogmodel;
  