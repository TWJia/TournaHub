const mongoose = require('mongoose')

const TournamentSchema = new mongoose.Schema({
    organizerId: String,
    collaboratorId: String,
    tournamentName: String,
    tournamentSport: String,
    tournamentFormat: String,
    tournamentDetails: String,
    tournamentNumberofplayers: String,
    tournamentNumberofmatches: String,
    Status: String
})

const TournamentModel= mongoose.model("tournaments", TournamentSchema)

module.exports = TournamentModel;