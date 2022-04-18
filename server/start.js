const dotenv = require('dotenv');
const http = require('http');
const app = require('./app');
const { dbConnect } = require('./helpers/dbConnect');

const server = http.createServer(app);

dotenv.config();

dbConnect().on('error', (err) => {
  console.log('connection to db failed');
  console.log(err);
});

server.listen(process.env.PORT, () => console.log(`Server started on ${process.env.PORT}`));
