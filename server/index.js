const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require('cors');
require("dotenv").config();
const fs = require("file-system");
const bodyParser = require('body-parser');
const auth = require("./routes/auth");
const user = require("./routes/user");
const post = require("./routes/post");
const app = express();

mongoose
  .connect("mongodb://localhost/MernProject")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(bodyParser.urlencoded({limit: "90mb", extended: false }));
app.use(bodyParser.json({limit: "90mb", extended: false }));
app.use(cors());
//app.use(express)
app.use(express.urlencoded({limit: "90mb", extended: true }));
app.use("/images", express.static("public/images"));

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images");
//   },
//   filename: (req, file, cb) => {
//     //const name = file.originalname.split(".");
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });
// app.post("/api/upload", upload.single("myImage"), (req, res) => {
//   var img = fs.readFileSync(req.body.myImage);
//   var encode_image = img.toString("base64");
//   try {
//     return res.status(200).send(req.body);
//   } catch (error) {
//     console.error(error);
//   }
// });

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/page.html");
});

app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/post", post);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
