const http = require("http");
const express = require("express");
const mongooseConnect = require("./helpers/dbConnect");
const dotenv = require("dotenv");
const cors = require("cors");
const router = require("./routes/routes");
const app = express();
const server = http.createServer(app);

const whitelist = [
  "http://localhost:5000",
  "http://localhost:3000",
  "http://localhost:3001",
];
const corsOptions = {
  credentials: true,
  exposedHeaders: ["set-cookie"],
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) return callback(null, true);
    callback(new Error("Not allowed by CORS"));
  },
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/", router);

dotenv.config();

mongooseConnect
  .dbconnect()
  .on("error", (err) => console.log("connection to db failed"));

server.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
