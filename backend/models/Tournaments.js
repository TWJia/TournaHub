const mongoose = require("mongoose");

const MakeUniqueSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});
const TournamentSchema = new mongoose.Schema({
  organizerId: String,
  collaboratorId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  }],
  tournamentName: String,
  tournamentSport: String,
  tournamentSkillLevel: String,
  tournamentFormat: String,
  tournamentDetails: String,
  tournamentStartDate: Date,
  tournamentEndDate: Date,
  tournamentNumberofplayers: String,
  tournamentNumberofmatches: String,
  tournamentStatus: String,
  applications: [MakeUniqueSchema],
});

const TournamentModel = mongoose.model("tournaments", TournamentSchema);

module.exports = TournamentModel;
