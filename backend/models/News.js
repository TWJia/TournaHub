const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
  title: String,
  author: String,
  content: String,
  image: String,
  category: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  postDate: { type: Date, default: Date.now },
});

const NewsModel = mongoose.model("news", NewsSchema);

module.exports = NewsModel;
