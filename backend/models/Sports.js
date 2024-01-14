const mongoose = require('mongoose')

const SportsSchema = new mongoose.Schema({
    name: String,
    tournamentFormats: [String],
});

const SportsModel= mongoose.model("sports", SportsSchema)

module.exports = SportsModel;