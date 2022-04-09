const http = require("http");
const express = require("express");
const mongooseConnect = require('./helpers/dbConnect');
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const server = http.createServer(app);

app.use(cors);
app.use(express.json());

dotenv.config();

mongooseConnect.dbconnect()
                .on('error', (err) => console.log("connection to db failed"))

server.listen(process.env.PORT, () => console.log(`Server started on ${process.env.PORT}`));
