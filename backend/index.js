const express = require("express");
const cors = require("cors");

const cookieParser = require("cookie-parser");
const multer = require("multer");

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
  handleGetAllUser,
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
  countUsers,
} = require("./controllers/Users");
const {
  handleGetTournaments,
  handleUpdateTournament,
  UpdateTournamentStatus,
  handleCreateTournament,
  handleGetSingleTournament,
  handleDeleteTournament,
  countTournaments,
  applyForTournament,
  getOpenTournaments,
  reviewTournamentApplications,
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
const {
  IconPayment,
  ArticlePayment,
  UploadSponsorIcon,
  fetchSponsorIconsHomePage,
} = require("./controllers/Sponsor");
const { handleCreateStatus } = require("./controllers/Status");

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

// setup db
require("./utils/db");

// Used for getting the PDF files for verification
app.use("/verify", express.static("verify"));
// Used for getting the Sponsor Icon images
app.use("/sponsoricon", express.static("sponsoricon"));

//Reviews API
app.use("/api/reviews", require("./routes/Reviews"));
app.use("/api/news", require("./routes/News"));
app.use("/images", express.static("images"));

// Middlewares
// Multer file upload locations
//For verification
const verifyStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./verify");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const verifyUpload = multer({ storage: verifyStorage });
//For sponsor icons
const sponsorIconStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./sponsoricon");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const sponsorIconUpload = multer({ storage: sponsorIconStorage });

//APIs
//Testing

//Reviews API

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

app.post("/login", handleLogin);

// Register API
app.post("/register", verifyUpload.single("verification"), handleRegister);
// Retrieve current user information
app.get("/getCurrentUser", getCurrentUser);
// Forget/Reset Password
app.post("/forgetPassword", forgetPassword);
app.post("/resetPassword/:id/:token", resetPassword);

// System Administrator APis
// Manage Sports APIs
app.get("/ManageSports", handleManageSports);

app.get("/getSport/:id", handleGetSingleSport);
app.get("/getSports", handleGetSports);

app.put("/updateSport/:id", handleUpdateSport);
app.delete("/deleteSport/:id", handleDeleteSport);

app.get("/searchSports/:name", handleSearchSport);
app.post("/CreateSport", handleCreateSport);
// Manage Users APIs
app.get("/ManageUsers", handleManageUser);
app.get("/PendingUsers", getPendingUsers);

app.get("/getUser/:id", getSingleUser);

app.put("/updateUser/:id", updateUser);

app.put("/suspendUser/:id", suspendedUsers);

app.put("/approveUser/:id", approveUser);
app.get("/searchUsers/:name", searchUsers);

app.get("/getAllUser", handleGetAllUser);

// app.get('/getTournaments', (req, res) => {
//     res.send('Hello, this is the tournaments endpoint!');
// });

app.post("/CreateTournament", handleCreateTournament);
app.get("/getTournaments", handleGetTournaments);
app.get("/getTournamentDetails/:id", handleGetSingleTournament);
app.put("/updateTournament/:id", handleUpdateTournament);
app.delete("/deleteTournament/:id", handleDeleteTournament);
//User: Application API
app.post("/applyForTournament/:tournamentId/:userId", applyForTournament);
app.get("/getOpenTournaments", getOpenTournaments);
app.post("/reviewTournamentApplications/:id", reviewTournamentApplications);

app.post("/CreateMatches", handleCreateMatches);
app.get("/getMatches/:tournamentId", handleGetMatches);
app.put("/updateMatches/:id", handleUpdateMatches);

app.put("/updateTournamentStatus/:tournamentId", UpdateTournamentStatus);

app.get("/getRankingTable/:tournamentId", handleGetRankingTable);
app.post("/CreateRankingTable", handleCreateRankingTable);
//
app.post("/CreateStatus", handleCreateStatus);

//Sponsor API
app.post("/create-checkout-session-icon", IconPayment);
app.post("/create-checkout-session-article", ArticlePayment);
app.post(
  "/upload-sponsor-icon",
  sponsorIconUpload.single("icon"),
  UploadSponsorIcon
);

//Homepage API
app.get("/count-user", countUsers);
app.get("/count-tournaments", countTournaments);
//currently bugged
app.get("/fetch-sponsor-icons", fetchSponsorIconsHomePage);

//Validation message to see if connection is successful
app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
});
