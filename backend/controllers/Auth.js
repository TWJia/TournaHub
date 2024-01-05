const UserModel = require("../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const handleLogin = (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.isActive === "Suspended") {
        return res.json("User is suspended");
      } else if (user.isActive === "Pending") {
        return res.json("User is pending verification");
      } else {
        bcrypt.compare(password, user.password, (err, response) => {
          if (response) {
            const token = jwt.sign(
              { email: user.email, usertype: user.usertype, id: user._id },
              "jwt-secret-key",
              { expiresIn: "1d" }
            );
            res.cookie("token", token);
            return res.json({
              Status: "Login is successful",
              usertype: user.usertype,
            });
          } else {
            // Handle incorrect password
            return res.json("The password is incorrect");
          }
        });
      }
    } else {
      // Handle case where no user is found
      return res.json("No record existed");
    }
  });
};
const handleRegister = (req, res) => {
  const {
    name,
    email,
    password,
    gender,
    dob,
    skillLevel,
    interestedSport,
    usertype,
  } = req.body;
  let verification = "";

  // Check if a file was uploaded
  if (req.file && req.file.filename) {
    verification = req.file.filename;
  }

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      UserModel.create({
        name,
        email,
        password: hash,
        gender,
        dob,
        skillLevel,
        interestedSport,
        verification,
        usertype,
      })
        .then((users) => res.json(users))
        .catch((err) => res.json(err));
    })
    .catch((err) => console.log(err.message));
};

const getCurrentUser = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("Token is missing");
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json("Error with token");
      } else {
        UserModel.findOne({ _id: decoded.id })
          .then((user) => {
            if (user) {
              res.json(user);
            } else {
              return res.json("Error");
            }
          })
          .catch((err) => res.json(err));
      }
    });
  }
};
module.exports = { handleLogin, handleRegister, getCurrentUser };
