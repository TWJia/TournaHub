const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const UserModel = require('./models/Users')
const SportsModel =  require('./models/Sports')
const TournamentModel = require('./models/Tournaments')
const { ObjectId } = require('mongodb');

const app = express()
const PORT = 3001
app.use(express.json())
app.use(cors({
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
}))
app.use(cookieParser())

// Edit the connection string to connect to YOUR instance of MongoDB
mongoose.connect("mongodb://localhost:27017/TournaHub")

// Middlewares
// Login Middlewares
const verifySysAdmin = (req, res, next) => {
    const token = req.cookies.token;
    if (!token){
        return res.json("Token is missing")
    } else {
        jwt.verify(token, "jwt-secret-key", (err,decoded) => {
            if(err) {
                return res.json("Error with token")
            } else {
                if (decoded.usertype === "systemadministrator") {
                    next()
                } else {
                    return res.json("User is not an system administrator")
                }
            }
        })
    }
}

const verifyApplicant = (req, res, next) => {
    const token = req.cookies.token;
    if (!token){
        return res.json("Token is missing")
    } else {
        jwt.verify(token, "jwt-secret-key", (err,decoded) => {
            if(err) {
                return res.json("Error with token")
            } else {
                if (decoded.usertype === "applicant") {
                    next()
                } else {
                    return res.json("User is not an applicant")
                }
            }
        })
    }
}

const verifyCollaborator = (req, res, next) => {
    const token = req.cookies.token;
    if (!token){
        return res.json("Token is missing")
    } else {
        jwt.verify(token, "jwt-secret-key", (err,decoded) => {
            if(err) {
                return res.json("Error with token")
            } else {
                if (decoded.usertype === "collaborator") {
                    next()
                } else {
                    return res.json("User is not a collaborator")
                }
            }
        })
    }
}

const verifyTournamentOrganizer = (req, res, next) => {
    const token = req.cookies.token;
    if (!token){
        return res.json("Token is missing")
    } else {
        jwt.verify(token, "jwt-secret-key", (err,decoded) => {
            if(err) {
                return res.json("Error with token")
            } else {
                if (decoded.usertype === "tournamentorganizer") {
                    next()
                } else {
                    return res.json("User is not a tournament organizer")
                }
            }
        })
    }
}

const verifyEventCoordinator = (req, res, next) => {
    const token = req.cookies.token;
    if (!token){
        return res.json("Token is missing")
    } else {
        jwt.verify(token, "jwt-secret-key", (err,decoded) => {
            if(err) {
                return res.json("Error with token")
            } else {
                if (decoded.usertype === "eventcoordinator") {
                    next()
                } else {
                    return res.json("User is not an event coordinator")
                }
            }
        })
    }
}

const verifySponsor = (req, res, next) => {
    const token = req.cookies.token;
    if (!token){
        return res.json("Token is missing")
    } else {
        jwt.verify(token, "jwt-secret-key", (err,decoded) => {
            if(err) {
                return res.json("Error with token")
            } else {
                if (decoded.usertype === "sponsor") {
                    next()
                } else {
                    return res.json("User is not a sponsor")
                }
            }
        })
    }
}

//APIs
//Login APIs
app.get('/DashboardSA', verifySysAdmin , (req,res ) => {
    res.json("Login is successful")
})

app.get('/DashboardA', verifyApplicant , (req,res ) => {
    res.json("Login is successful")
})

app.get('/DashboardC', verifyCollaborator , (req,res ) => {
    res.json("Login is successful")
})

app.get('/DashboardTO', verifyTournamentOrganizer , (req,res ) => {
    res.json("Login is successful")
})

app.get('/DashboardEC', verifyEventCoordinator , (req,res ) => {
    res.json("Login is successful")
})

app.get('/DashboardS', verifySponsor , (req,res ) => {
    res.json("Login is successful")
})

app.post('/login', (req, res) => {
    const {email,password} = req.body;
    UserModel.findOne({email: email})
    .then(user => {
        if (user) {
            if (user.isActive === "Suspended"){
                return res.json("User is suspended")
            }
            else {
            bcrypt.compare(password, user.password, (err, response) => {
                if (response) {
                    const token = jwt.sign({email: user.email, usertype: user.usertype},
                            "jwt-secret-key", {expiresIn: '1d'})
                    res.cookie('token', token)       
                    return res.json({Status: "Login is successful", usertype: user.usertype})
                } else {
                    return res.json("The password is incorrect")
                }
            })    
        }} else {
            return res.json("No record existed")
        }
    })
})

// Register API
app.post('/register', (req,res) => {
    const {name, email, password, usertype} = req.body;
    bcrypt.hash(password, 10)
    .then(hash => {
        UserModel.create({name, email, password: hash, usertype})
        .then(users => res.json(users))
        .catch(err => res.json(err))
    }).catch(err => console.log(err.message))
})

// System Administrator APis
// Manage Sports APIs
app.get("/ManageSports", (req, res) => {
    SportsModel.find({})
    .then(sports => res.json(sports))
    .catch(err => res.json(err))
})

app.get('/getSport/:id', (req, res) => {
    const id = req.params.id;
    SportsModel.findById({_id:id})
    .then(sports => res.json(sports))
    .catch(err => res.json(err))
})

app.put('/updateSport/:id', (req,res) => {
    const id = req.params.id
    SportsModel.findByIdAndUpdate({_id: id}, 
        {name: req.body.name, 
         format: req.body.format})
    .then(sports => res.json(sports))
    .catch(err => res.json(err))
})

app.delete('/deleteSport/:id', (req,res) => {
    const id = req.params.id;
    SportsModel.findByIdAndDelete({_id: id})
    .then(res => res.json(err))
    .catch(err => res.json(err))
})

app.get('/searchSports/:name', (req, res) => {
    const { name } = req.params;
    SportsModel.find({ name: { $regex: new RegExp(name, 'i') } })
    .then((sports) => res.json(sports))
    .catch((err) => res.json(err));
  });
  

app.post("/CreateSport", (req, res) => {
    SportsModel.create(req.body)
    .then(sports => res.json(sports))
    .catch(err => res.json(err))
})
// Manage Users APIs
app.get("/ManageUsers", (req, res) => {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.put('/updateUser/:id', async (req, res) => {
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
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/suspendUser/:id', (req,res) => {
    const id = req.params.id;
    const suspended = "Suspended";
    UserModel.findByIdAndUpdate({_id: id}, {
        isActive: suspended
    })
    .then(res => res.json(err))
    .catch(err => res.json(err))
})

app.get('/searchUsers/:name', (req, res) => {
    const { name } = req.params;
    UserModel.find({ name: { $regex: new RegExp(name, 'i') } })
    .then((sports) => res.json(sports))
    .catch((err) => res.json(err));
  });
//

// app.get('/getTournaments', (req, res) => {
//     res.send('Hello, this is the tournaments endpoint!');
// });

app.get("/getTournaments", (req, res) => {
    TournamentModel.find({})
        .then(function(tournaments) {
            res.json(tournaments)
        })
        .catch(function(err) {
            console.error("Error fetching tournaments:", err)
            res.Status(500).json({ error: "Internal Server Error" })
        //res.json(err)
    })
})

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
        res.Status(500).json({ error: "Internal Server Error", message: err.message });
    }
});

//Validation message to see if connection is successful
app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})

