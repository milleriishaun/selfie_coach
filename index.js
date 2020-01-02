const dotenvsafe = require("dotenv-safe");
const express = require("express");
const connectDB = require("./DB/Connection");
const compression = require("compression");
const morgan = require("morgan");
const path = require("path");
const fetch = require("node-fetch");
global.fetch = fetch;
const app = express();

connectDB();

// "NODE_ENV=production node index.js" keeps .env safe from production mode
if (process.env.NODE_ENV !== "production") {
  dotenvsafe.config();
}

const normalizePort = port => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 3001);

// .use for Middleware
app.use(express.static("public"));
app.use(express.json({ limit: "1mb", extended: "false" }));

// Route to DB
app.use("/", require("./Api/User"));

// Build/Deploy helpers
app.use(compression());
app.use(morgan("common"));

app.disable("x-powered-by");

const randomPageNum = Math.floor(Math.random() * 19 + 1);

app.get("/api", (req, res) => {
  fetch(
    `https://api.unsplash.com/collections/155450/photos/?page=${randomPageNum}&per_page=30&auto=format&w=200&dpi=2&client_id=${process.env.UNSPLASH}`
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

// Node/Express we'd like it to serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Handle React routing, return all requests to React app
  app.get("*", (req, res) => {
    // Send any other requests to the index.html page
    console.log(`hit Herokuproxy(${PORT}) or express proxy(port3001)`);
    res.sendFile(path.join(__dirname + "/public/index.html"));
  });
}

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
