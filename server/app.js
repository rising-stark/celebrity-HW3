const http = require("http");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const server = http.createServer(app);

app.use(cors);
app.use(express.json());

dotenv.config();
server.listen(process.env.PORT, () => console.log(`Server started on ${process.env.PORT}`));
