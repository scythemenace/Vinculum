const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const mapRoutes = require("./routes/mapRoutes");
const userRoutes = require("./routes/userRoutes");
const setupSocket = require("./sockets");
require("dotenv").config();
/*
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
*/

app.use(cors());

app.use(express.json());

const rootRouter = require("./routes/index");

app.use("/api/v1", rootRouter);

const server = http.createServer(app);
const io = socketIo(server);

setupSocket(io);

const port = process.env.PORT || 3000;

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log("Server listening on PORT", port);
});

module.exports = app;