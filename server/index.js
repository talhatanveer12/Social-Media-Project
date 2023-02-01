const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const { Server } = require('socket.io');
const http = require('http');
const cors = require('cors');
require("dotenv").config();
const fs = require("file-system");
const bodyParser = require('body-parser');
const auth = require("./routes/auth");
const user = require("./routes/user");
const post = require("./routes/post");
const app = express();

mongoose
  .connect("mongodb+srv://TalhaTanveer:T123a12AA@cluster0.hiby9p2.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(bodyParser.urlencoded({limit: "90mb", extended: false }));
app.use(bodyParser.json({limit: "90mb", extended: false }));
app.use(cors());
//app.use(express)
app.use(express.urlencoded({limit: "90mb", extended: true }));
app.use("/images", express.static("public/images"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/page.html");
});

app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/post", post);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET",'POST']
  }
});

io.on("connection", (socket) => {
  socket.on("create_post",(data) => {
    socket.broadcast.emit("receive_post",data);
  });
  socket.on("add_likes",(data) => {
    socket.broadcast.emit("receive_like",data);
  })
  socket.on("add_comments",(data) => {
    socket.broadcast.emit("receive_comment",data);
  })
});


server.listen(4000, () => {
  console.log('Server Running');
})

// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Listening on port ${port}...`));
