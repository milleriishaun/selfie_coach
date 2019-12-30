const dotenvsafe = require("dotenv-safe");
const express = require("express");
const dataStore = require("nedb");
const fetch = require("node-fetch");
global.fetch = fetch;
const app = express();

// "NODE_ENV=production node index.js" keeps .env safe from production mode
if (process.env.NODE_ENV !== "production") {
  dotenvsafe.config();
}

app.listen(3000, () => console.log("listening on port 3000"));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const database = new dataStore("database.db");
database.loadDatabase();

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

app.get("/db", (req, res) => {
  database.find({}, (err, data) => {
    if (err) {
      res.end();
      return;
    }
    res.json(data);
  });
});

app.post("/db", (request, response) => {
  const serverData = request.body;
  const timestamp = Date.now();
  serverData.timestamp = timestamp;
  database.insert(serverData);
  response.json(serverData);
});
