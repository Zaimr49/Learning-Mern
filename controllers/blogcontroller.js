const path = require("path");
const blogmodel = require(path.join(__dirname, "../models/blogmodel"));

exports.createBlog = (req, res) => {
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

  res.send(req.body);
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
