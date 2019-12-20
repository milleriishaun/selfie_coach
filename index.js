const express = require("express");
const dataStore = require("nedb");
const fetch = require("node-fetch");
global.fetch = fetch;
const app = express();

app.listen(3000, () => console.log("listening on port 3000"));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const database = new dataStore("database.db");
database.loadDatabase();
// database.insert({ firstName: "Cool", lastName: "Bro", status: "🤔" });
// database.insert({ firstName: "Unbeareev", lastName: "Able", status: "🐻" });

app.get("/api", (req, res) => {
  fetch(
    `https://api.unsplash.com/collections/155450/photos/?per_page=7&auto=format&w=200&dpi=2&client_id=65ac45f6f9404d5a86559b81a532d60b52c80e97921dfeaede0bbedddb7bb59e`
  )
    .then(response => {
      console.log("response ok?: ", response.ok);
      return response.json();
    })
    .then(data => {
      res.send(data);
    })
    .catch(e => console.log("could not fetch from API, err: ", e));
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
  console.log("DB received: ", serverData);
  response.json(serverData);
});
