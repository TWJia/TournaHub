const UserModel = require("../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const handleManageUser = (req, res) => {
  UserModel.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
};
const getPendingUsers = (req, res) => {
  UserModel.find({ isActive: "Pending" })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
};
const getSingleUser = (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
};
const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      { _id: id },
      {
        name: req.body.name,
        email: req.body.email,
        usertype: req.body.usertype,
        isActive: req.body.isActive,
        password: await bcrypt.hash(req.body.password, 10),
      },
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const suspendedUsers = (req, res) => {
  const id = req.params.id;
  const suspended = "Suspended";
  UserModel.findByIdAndUpdate(
    { _id: id },
    {
      isActive: suspended,
    }
  )
    .then((res) => res.json(err))
    .catch((err) => res.json(err));
};
const approveUser = (req, res) => {
  const id = req.params.id;
  const approved = "Active";
  UserModel.findByIdAndUpdate(
    { _id: id },
    {
      isActive: approved,
    }
  )
    .then((res) => res.json(err))
    .catch((err) => res.json(err));
};

const searchUsers = (req, res) => {
  const { name } = req.params;
  UserModel.find({ name: { $regex: new RegExp(name, "i") } })
    .then((sports) => res.json(sports))
    .catch((err) => res.json(err));
  //
};

const verifySponsor = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("Token is missing");
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json("Error with token");
      } else {
        if (decoded.usertype === "sponsor") {
          next();
        } else {
          return res.json("User is not a sponsor");
        }
      }
    });
  }
};
const verifyTournamentOrganizer = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("Token is missing");
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json("Error with token");
      } else {
        if (decoded.usertype === "tournamentorganizer") {
          next();
        } else {
          return res.json("User is not a tournament organizer");
        }
      }
    });
  }
};
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.json("Token is missing");
    } else {
      jwt.verify(token, "jwt-secret-key", (err, decoded) => {
        if (err) {
          return res.json("Error with token");
        } else {
          if (decoded.usertype === "user") {
            next();
          } else {
            return res.json("User is not an user");
          }
        }
      });
    }
  };

  const verifySysAdmin = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.json("Token is missing");
    } else {
      jwt.verify(token, "jwt-secret-key", (err, decoded) => {
        if (err) {
          return res.json("Error with token");
        } else {
          if (decoded.usertype === "systemadministrator") {
            next();
          } else {
            return res.json("User is not an system administrator");
          }
        }
      });
    }
  };
module.exports = {
  verifyTournamentOrganizer,
  handleManageUser,
  getPendingUsers,
  getSingleUser,
  suspendedUsers,
  updateUser,
  searchUsers,
  approveUser,
  verifySponsor,
  verifyUser,
  verifySysAdmin,
};
