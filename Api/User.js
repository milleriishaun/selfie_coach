const express = require("express");
const mongoose = require("mongoose");
const User = require("../DB/User");
const route = express.Router();

route.get("/db", async (req, res) => {
  const collection = User.find(
    {
      lat: { $lt: "38", $gt: "37" },
      lon: { $gt: "-121", $lt: "-122" }
    },
    (err, data) => {
      if (err) {
        res.end();
        return;
      }
      res.json(data);
    }
  );
});

route.post("/db", async (request, response) => {
  // const serverData = request.body;
  // const timestamp = Date.now();
  // serverData.timestamp = timestamp;
  // database.insert(serverData);
  const { lat, lon, mood, image64, coachPose, timestamp } = request.body;
  let user = {};
  user.lat = lat;
  user.lon = lon;
  user.mood = mood;
  user.image64 = image64;
  user.coachPose = coachPose;
  user.timestamp = timestamp;
  let userModel = new User(user);
  await userModel.save();
  response.json(userModel);
});

module.exports = route;
