const dotenvsafe = require("dotenv-safe");
const express = require("express");
const connectDB = require("./DB/Connection");
// const dataStore = require("nedb");
const fetch = require("node-fetch");
global.fetch = fetch;
const app = express();

connectDB();
// const mongo = `mongodb://Tuser:<password>@cluster0-shard-00-00-adqeq.mongodb.net:27017,cluster0-shard-00-01-adqeq.mongodb.net:27017,cluster0-shard-00-02-adqeq.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`;

// "NODE_ENV=production node index.js" keeps .env safe from production mode
if (process.env.NODE_ENV !== "production") {
  dotenvsafe.config();
}

app.listen(3000, () => console.log("listening on port 3000"));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb", extended: "false" }));
app.use("/", require("./Api/User"));

// const database = new dataStore("database.db");
// database.loadDatabase();

app.get("/api", (req, res) => {
  fetch(
    `https://api.unsplash.com/collections/155450/photos/?per_page=7&auto=format&w=200&dpi=2&client_id=${process.env.UNSPLASH}`
  )
    .then(response => {
      console.log("response ok?: ", response.ok);
      return response.json();
    })
    .then(data => {
      res.send(data);
    })
    .catch(e => console.log("Could not fetch from API, err: ", e));
});

// app.get("/db", (req, res) => {
//   database.find({}, (err, data) => {
//     if (err) {
//       res.end();
//       return;
//     }
//     res.json(data);
//   });
// });

// app.post("/db", async (request, response) => {
//   // const serverData = request.body;
//   const timestamp = Date.now();
//   // serverData.timestamp = timestamp;
//   // database.insert(serverData);
//   const { lat, lon, mood, image64, coachPose } = request.body;
//   let user = {};
//   user.lat = lat;
//   user.lon = lon;
//   user.mood = mood;
//   user.image64 = image64;
//   user.coachPose = coachPose;
//   user.timestamp = timestamp;
//   let userModel = new user(user);
//   await userModel.save();
//   response.json(userModel);
// });
