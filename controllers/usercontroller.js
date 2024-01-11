const path = require("path");
const usermodel = require(path.join(__dirname, "../models/usermodel"));
const bcrypt = require("bcrypt");

// there are two ways to use bcrypt hashing
// one is to use brcypt in the controller in the save function
// the second one is to use bcrypt in the model

exports.newuserformFunc = (req, res) => {
  res.render("newuserform");
};

// Method 1
// exports.newusersaveFunc = (req, res) => {
//   const bcrypt = require("bcrypt");
//   const saltRounds = 10;
//   bcrypt
//     .hash(req.body.userpassword, saltRounds)
//     .then((hash) => {
//       // Store hash in your password DB.
//       console.log("Password:", req.body.userpassword);
//       console.log("Hash:", hash);
//       const newUser = usermodel({
//         username: req.body.username,
//         useremail: req.body.useremail,
//         userpassword: hash,
//       });

//       newUser
//         .save()
//         .then((data) => {
//           console.log(data);
//           console.log("New User Saved");
//         })
//         .catch((error) => {
//           console.log("New User Not Saved, Error:" + error);
//         });
//     })
//     .catch((error) => {
//       console.log("Error Hashing Password");
//     });
//   res.redirect("/");
// };

// Method 2
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

  res.redirect("/");
};

exports.checkuser = async (req, res) => {
  try {
    const { useremail, userpassword } = req.body;
    console.log(req.body);

    // Find the user by email
    const user = await usermodel.findOne({ useremail: useremail });

    if (!user) {
      console.log("No Such User Was Found");
      res.status(404).send("User not found");
      return;
    }

    console.log(user);

    // Compare the provided password with the stored hash
    const match = await bcrypt.compare(userpassword, user.userpassword);

    if (match) {
      console.log("It's a match");
      // Handle successful login here (e.g., generate a token, set session, etc.)
      res.send("Login successful");
    } else {
      console.log("No match found");
      res.status(401).send("Incorrect password");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred during login");
  }
};
