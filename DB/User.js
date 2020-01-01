const mongoose = require("mongoose");

const userD = new mongoose.Schema({
  lat: {
    type: String
  },
  lon: {
    type: String
  },
  mood: {
    type: String
  },
  image64: {
    type: String
  },
  coachPose: {
    type: String
  },
  timestamp: {
    type: Number
  }
});

module.exports = User = mongoose.model("user", userD);
