const mongoose = require('mongoose')

const SportsSchema = new mongoose.Schema({
    name: String,
    format: String
})

const SportsModel= mongoose.model("sports", SportsSchema)

module.exports = SportsModel;