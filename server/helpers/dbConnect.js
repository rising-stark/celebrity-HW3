const mongoose = require('mongoose');
const dotenv = require('dotenv');

function dbConnect(test = false) {
  dotenv.config();
  let dbUri;
  if (test) dbUri = process.env.TEST_DB_URI;
  else dbUri = process.env.DB_URI;
  mongoose
    .connect(dbUri)
    .then(() => console.log('Connected To Database'))
    .catch((err) => console.log(err));
  return mongoose.connection;
}

function dbClose() {
  return mongoose.disconnect();
}

module.exports = { dbConnect, dbClose };
