const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  category: String,
});

const NewsModel = mongoose.model("news", NewsSchema);

module.exports = NewsModel;
