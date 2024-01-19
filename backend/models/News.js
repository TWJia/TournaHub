const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
  title: String,
  author: String,
  content: String,
  category: String,
  photo: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  postDate: { type: Date, default: Date.now },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
});

const NewsModel = mongoose.model("news", NewsSchema);

module.exports = NewsModel;
