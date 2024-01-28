const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  action: {
    type: String,
    default: "apply",
  },
});

const TournamentSchema = new mongoose.Schema({
  organizerId: String,
  collaboratorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
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
  applications: [ApplicationSchema],
});

const TournamentModel = mongoose.model("tournaments", TournamentSchema);

module.exports = TournamentModel;
