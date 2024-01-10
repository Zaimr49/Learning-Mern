const path = require("path");
const blogmodel = require(path.join(__dirname, "../models/blogmodel"));

exports.addBlog = (req, res) => {
  // res.sendFile(path.join(__dirname,'..','view','saveblog.html'));

  //Now we are using handlebars
  // res.render("saveblog");

  if (req.params.p1) {
    blogmodel
      .findOne({ _id: req.params.p1 })
      .then((dbRecords) => {
        res.render("saveblog", { data: dbRecords });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  } else {
    res.render("saveblog");
  }
};

exports.createBlog = (req, res) => {
  if (req.body.id) {
    blogmodel.findByIdAndUpdate({_id:req.body.id},req.body).then((data)=>{
      console.log(data);
      console.log("Blog Updated Successfully...");
    }).catch((error)=>{
      console.log("Blog not updated: "+error);
    })
  } else {
    const newblog = blogmodel(req.body);
    console.log(req.body);

    // this can be used incase we don't have the same variable names in html and schema
    // const newblog = blogmodel(
    //   {blogname: req.body.txtblogname,
    //   blogauthor: req.body.txtblogauthor,
    //   blogcontent: req.body.txtblogcontent,
    //   })

    newblog
      .save()
      .then((data) => {
        console.log(data);
        console.log("New Blog Saved...");
      })
      .catch((error) => {
        console.log("New Blog Saved Process Failed, Error:" + error);
      });
  }
  // res.send(req.body);
  res.render("home");
};

exports.showBlogs = (req, res) => {
  blogmodel
    .find({})
    .then((data) => {
      const blogs = data.map((doc) => doc.toObject());
      res.render("showblogs", { rowBlogs: blogs });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.showAllBlogs = (req, res) => {
  if (req.params.p1) {
    blogmodel
      .find({ _id: req.params.p1 })
      .then((dbRecords) => {
        res.render("showallblogs", { data: dbRecords });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  } else {
    blogmodel
      .find({})
      .then((dbRecords) => {
        res.render("showallblogs", { data: dbRecords });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
};
