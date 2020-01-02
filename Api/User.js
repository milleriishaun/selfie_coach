const express = require("express");
const User = require("../DB/User");
const route = express.Router();

route.get("/db", async (req, res) => {
  const collection = User.find({}, (err, data) => {
    try {
      res.json(data);
    } catch (err) {
      res.json({ message: err });
    }
  });
});

route.post("/db", async (request, response) => {
  const { lat, lon, mood, image64, coachPose, timestamp } = request.body;
  let user = {};
  user.lat = lat;
  user.lon = lon;
  user.mood = mood;
  user.image64 = image64;
  user.coachPose = coachPose;
  user.timestamp = timestamp;
  let userModel = new User(user);
  try {
    const post = await userModel.save();
    response.json(userModel);
  } catch (err) {
    response.json({ message: err });
  }
});

module.exports = route;
