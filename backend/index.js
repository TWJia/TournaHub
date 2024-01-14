const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require('multer')
const UserModel = require("./models/Users");
const SportsModel = require("./models/Sports");
const TournamentModel = require("./models/Tournaments");
const { ObjectId } = require("mongodb");
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://TournaHub:123qwe@tournahub.ze12x0s.mongodb.net/";

<<<<<<< Updated upstream
// Options for the MongoClient
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// Create a MongoClient and connect to MongoDB Atlas
const client = new MongoClient(uri, options);

async function connect() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");

    // Your application logic goes here
  } finally {
    // Ensure the client is closed when your application terminates
    await client.close();
  }
}

// Call the connect function to establish a connection
connect();
=======
const {
  handleRegister,
  getCurrentUser,
  handleLogin,
  forgetPassword,
  resetPassword,
} = require("./controllers/Auth");
const {
  handleManageSports,
  handleGetSingleSport,
  handleGetSports,
  handleUpdateSport,
  handleDeleteSport,
  handleSearchSport,
  handleCreateSport,
} = require("./controllers/sports");
const {
  handleManageUser,
  getPendingUsers,
  getSingleUser,
  updateUser,
  suspendedUsers,
  approveUser,
  searchUsers,
  verifySponsor,
  verifyTournamentOrganizer,
  verifyUser,
  verifySysAdmin,
} = require("./controllers/Users");
const {
  handleGetTournaments,
  UpdateTournamentStatus,
  handleCreateTournament,
  handleGetSingleTournament,
  handleDeleteTournament,
  handleUpdateTournament,
} = require("./controllers/Tournaments");
const {
  handleCreateMatches,
  handleGetMatches,
  handleUpdateMatches,
} = require("./controllers/Matches");
const {
  handleCreateRankingTable,
  handleGetRankingTable,
} = require("./controllers/RankingTable");

>>>>>>> Stashed changes

const app = express();
const PORT = 3001;
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
// Used for getting the PDF files for verification
app.use("/verify", express.static("verify"))

// Connection String is set to connect to the Tournahub Database in MongoDB Atlas
mongoose.connect("mongodb+srv://TournaHub:123qwe@tournahub.ze12x0s.mongodb.net/Tournahub", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middlewares
// Multer file upload locations
const verifyStorage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './verify')
  },
  filename: function (req, file, cb){
    const uniqueSuffix = Date.now()
    cb(null, uniqueSuffix + file.originalname)
  }
})

const verifyUpload = multer({storage: verifyStorage})

//
// Login Middlewares
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

//APIs
//Login APIs
app.get("/DashboardSA", verifySysAdmin, (req, res) => {
  res.json("Login is successful");
});

app.get("/home", verifyUser, (req, res) => {
  res.json("Login is successful");
});

app.get("/DashboardTO", verifyTournamentOrganizer, (req, res) => {
  res.json("Login is successful");
});


app.get("/DashboardS", verifySponsor, (req, res) => {
  res.json("Login is successful");
});

app.post("/login", (req, res) => {
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
              { email: user.email, usertype: user.usertype },
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
});


// Register API
app.post("/register", verifyUpload.single("verification"), (req, res) => {
  const { name, email, password, gender, dob, skillLevel, interestedSport, usertype } = req.body;
  let verification = '';

  // Check if a file was uploaded
  if (req.file && req.file.filename) {
    verification = req.file.filename;
  }

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      UserModel.create({ name, email, password: hash, gender, dob, skillLevel, interestedSport, verification, usertype })
        .then((users) => res.json(users))
        .catch((err) => res.json(err));
    })
    .catch((err) => console.log(err.message));
});

// Retrieve current user information
app.get("/getCurrentUser", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("Token is missing");
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json("Error with token");
      } else {
        UserModel.findOne({ email: decoded.email })
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
});

// System Administrator APis
// Manage Sports APIs
app.get("/ManageSports", (req, res) => {
  SportsModel.find({})
    .then((sports) => res.json(sports))
    .catch((err) => res.json(err));
});

app.get("/getSport/:id", (req, res) => {
  const id = req.params.id;
  SportsModel.findById({ _id: id })
    .then((sports) => res.json(sports))
    .catch((err) => res.json(err));
});

app.put("/updateSport/:id", (req, res) => {
  const id = req.params.id;
  SportsModel.findByIdAndUpdate(
    { _id: id },
    { name: req.body.name}
  )
    .then((sports) => res.json(sports))
    .catch((err) => res.json(err));
});

app.delete("/deleteSport/:id", (req, res) => {
  const id = req.params.id;
  SportsModel.findByIdAndDelete({ _id: id })
    .then((res) => res.json(err))
    .catch((err) => res.json(err));
});

app.get("/searchSports/:name", (req, res) => {
  const { name } = req.params;
  SportsModel.find({ name: { $regex: new RegExp(name, "i") } })
    .then((sports) => res.json(sports))
    .catch((err) => res.json(err));
});

// app.post("/CreateSport", (req, res) => {
//   SportsModel.create(req.body)
//     .then((sports) => res.json(sports))
//     .catch((err) => res.json(err));
// });

// app.post("/CreateSport", async (req, res) => {
//   try {
//     console.log("Request Body:", req.body); // Log the request body

//     const { name, selectedFormats } = req.body;

//     if (!name || !selectedFormats || !Array.isArray(selectedFormats)) {
//       return res.status(400).json({ error: 'Invalid request body' });
//     }

//     const sports = await SportsModel.create({ name, tournamentFormats: selectedFormats });
//     res.json(sports);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to create sport', details: err });
//   }
// });
app.post('/CreateSport', (req, res) => {
  const { name, tournamentFormats } = req.body;
  res.send({ success: true, message: 'Sport created successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// Manage Users APIs
app.get("/ManageUsers", (req, res) => {
  UserModel.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.get("/PendingUsers", (req, res) => {
  UserModel.find({isActive: "Pending" })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.put("/updateUser/:id", async (req, res) => {
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
});

app.put("/suspendUser/:id", (req, res) => {
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
});

app.put("/approveUser/:id", (req, res) => {
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
});

app.get("/searchUsers/:name", (req, res) => {
  const { name } = req.params;
  UserModel.find({ name: { $regex: new RegExp(name, "i") } })
    .then((sports) => res.json(sports))
    .catch((err) => res.json(err));
});
//

// app.get('/getTournaments', (req, res) => {
//     res.send('Hello, this is the tournaments endpoint!');
// });

<<<<<<< Updated upstream
app.get("/getTournaments", (req, res) => {
  TournamentModel.find({})
    .then(function (tournaments) {
      res.json(tournaments);
    })
    .catch(function (err) {
      console.error("Error fetching tournaments:", err);
      res.Status(500).json({ error: "Internal Server Error" });
      //res.json(err)
    });
});
=======
app.post('/CreateTournament', handleCreateTournament);
app.get("/getTournaments", handleGetTournaments);
app.get("/getTournamentDetails/:id", handleGetSingleTournament);
app.put("/updateTournament/:id", handleUpdateTournament);
app.delete("/deleteTournament/:id", handleDeleteTournament);
>>>>>>> Stashed changes

app.put("/updateTournamentStatus/:tournamentId", async (req, res) => {
  try {
    const tournamentId = req.params.tournamentId;
    const newStatus = req.body.newStatus;

    // Validate if the new status is provided
    if (!newStatus) {
      return res.Status(400).json({ error: "New status is required" });
    }

    const updatedTournament = await TournamentModel.findByIdAndUpdate(
      tournamentId,
      { Status: newStatus },
      { new: true }
    );

    if (!updatedTournament) {
      return res.Status(404).json({ error: "Tournament not found" });
    }

    res.json(updatedTournament);
  } catch (err) {
    console.error("Error updating tournament status:", err);
    res
      .Status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
});

//Validation message to see if connection is successful
app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
});
