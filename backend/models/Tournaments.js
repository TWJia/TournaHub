const mongoose = require('mongoose')

const TournamentSchema = new mongoose.Schema({
    organizerId: String,
    collaboratorId: String,
    tournamentName: String,
    tournamentSport: String,
    tournamentFormat: String,
    tournamentDetails: String,
    tournamentStartDate: Date,
    tournamentEndDate: Date,
    tournamentNumberofplayers: String,
    tournamentNumberofmatches: String,
    tournamentStatus: String,
})

const TournamentModel= mongoose.model("tournaments", TournamentSchema)

module.exports = TournamentModel;