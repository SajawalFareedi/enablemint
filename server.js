require("dotenv").config();
require("./database/index").createRequiredTables();

const express = require("express");
const server = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const fileUpload = require('express-fileupload');
const session = require('express-session')
var MemoryStore = require('memorystore')(session)
// const UserService = require('./src/user')

const env = process.env;
const PORT = env.PORT || env.BACKEND_SERVER_PORT;

process.on('exit', (code) => {
  // require('./database/DBConnection').end();
  console.info("exiting with code:", code);
});

server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});

server.use(bodyparser.json());
server.use(bodyparser.urlencoded({ extended: true }))
server.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

server.use(session({
  saveUninitialized: false,
  cookie: { maxAge: 86400000, secure: true },
  store: new MemoryStore({
    checkPeriod: 86400000
  }),
  resave: false,
  secret: process.env.TOKEN_SECRET
}))

server.use(fileUpload());
server.use(express.static('public'));
server.use("/api/authRoutes/", require("./routes/api/authRoutes"));
server.use("/api/sendMail/", require("./routes/api/sendMail"));
server.use("/api/dashboardRoutes/", require("./routes/api/dashboardRoutes"));
server.use("/api/file/", require("./routes/api/file"));


server.get('/', (req, res, next) => {
  res.status(404).send('404 Not Found');
});


server.listen(PORT, () =>
  console.log(`API is running on: http://127.0.0.1:${PORT}`)
);
