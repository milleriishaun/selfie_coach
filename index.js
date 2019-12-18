const express = require("express");
const dataStore = require("nedb");
const fetch = require("node-fetch");
global.fetch = fetch;
const app = express();
const Unsplash = require("unsplash-js").default;
const { toJson } = require("unsplash-js").default;

const unsplash = new Unsplash({
  accessKey: "{PICS}",
  // Optionally if using a node-fetch polyfill or a version of fetch which supports the timeout option, you can configure the request timeout for all requests
  timeout: 500 // values set in ms
});

app.listen(3000, () => console.log("listening on port 3000"));

app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const database = new dataStore("database.db");
database.loadDatabase();
// database.insert({ firstName: "Cool", lastName: "Bro", status: "🤔" });
// database.insert({ firstName: "Unbeareev", lastName: "Able", status: "🐻" });

app.get("/api", (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.post("/api", (request, response) => {
  // unsplash.search
  //   .photos("selfie", 1, 10, { orientation: "portrait" })
  //   .then(toJson)
  //   .then(json => {
  //     console.log("img src should change now");
  //     document.getElementById("selfieCoach").src = json;
  //   })
  //   .catch(err, () => console.log("err from unsplash"));

  const serverData = request.body;
  const timestamp = Date.now();
  serverData.timestamp = timestamp;
  database.insert(serverData);
  console.log("DB received: ", serverData);
  response.json(serverData);
});
