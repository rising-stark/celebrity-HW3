const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes/routes");
const app = express();

const corsOptions = {
  credentials: true,
  exposedHeaders: ["set-cookie"],
  origin: [
    "http://localhost:5000",
    "http://localhost:3000",
    "http://localhost:3001",
  ],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/", router);

module.exports = app;
