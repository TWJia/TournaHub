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

const ApplicationModel = mongoose.model("application", ApplicationSchema);
module.exports = ApplicationModel;
