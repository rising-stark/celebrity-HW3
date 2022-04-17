const mongoose = require("mongoose");
const dotenv = require("dotenv");

function dbConnect(test = false) {
  dotenv.config();
  let db_uri;
  if (test) db_uri = process.env.TEST_DB_URI;
  else db_uri = process.env.DB_URI;
  mongoose
    .connect(db_uri)
    .then(() => console.log("Connected To Database"))
    .catch((err) => console.log(err));
  return mongoose.connection;
}

function dbClose() {
  return mongoose.disconnect();
}

module.exports = { dbConnect, dbClose };
