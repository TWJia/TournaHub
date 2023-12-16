const mongoose = require('mongoose')

const TournamentSchema = new mongoose.Schema({
    tournamentName: String,
    tournamentDetails: String,
    Status: String
})

const TournamentModel= mongoose.model("tournaments", TournamentSchema)

module.exports = TournamentModel;