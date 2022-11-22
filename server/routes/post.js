const express = require("express");
const auth = require("../middleware/auth");
const { Post } = require("../models/Post");
const router = express.Router();
const multer = require("multer");
const { User } = require("../models/User");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.split(".");
    cb(null, name[0] + "-" + Date.now() + "." + name[1]);
  },
});

const upload = multer({ storage: storage });

router.post("/create", upload.single("myImage"), async (req, res) => {
  const post = new Post({
    decs: req.body.decs,
    image: req.file.filename,
    userId: req.body.userId,
  });

  await post.save();
  try {
    res.status(200).json("Successfully");
  } catch (error) {
    res.status(404).json("failed");
  }
});

router.post('/:id/comments', async (req,res) => {
  const post = await Post.findById(req.params.id);
  const user = await User.findById(req.body.userId);
  await post.updateOne({
    $push: {
      comments: {
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
        message: req.body.message
      }
    }
  });
  res.status(200).json("Comments Add Successfully");
})

module.exports = router;
