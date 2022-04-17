const app = require("./app");
const { dbConnect } = require("./helpers/dbConnect");
const dotenv = require("dotenv");
const http = require("http");
const server = http.createServer(app);

dotenv.config();

dbConnect().on("error", (err) => console.log("connection to db failed"));

server.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
