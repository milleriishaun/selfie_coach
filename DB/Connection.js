const mongoose = require("mongoose");
const dotenvsafe = require("dotenv-safe");

// "NODE_ENV=production node index.js" keeps .env safe from production mode
if (process.env.NODE_ENV !== "production") {
  dotenvsafe.config();
}

const URI = `mongodb://tuser:${process.env.PW}@cluster0-shard-00-00-adqeq.mongodb.net:27017,cluster0-shard-00-01-adqeq.mongodb.net:27017,cluster0-shard-00-02-adqeq.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`;

const connectDB = async () => {
  await mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("DB connected..!");
};

module.exports = connectDB;
