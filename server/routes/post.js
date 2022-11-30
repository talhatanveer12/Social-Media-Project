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

router.post("/create", upload.single("image"), async (req, res) => {
  const newPost = new Post({
    decs: req.body.decs,
    image: req.file?.filename,
    userId: req.body.userId,
    likes: {},
  });

  await newPost.save();
  const post = await Post.find();
  //res.status(201).json(post);
  try {
    res.status(200).json({post: post});
  } catch (error) {
    res.status(404).json("failed");
  }
});

router.get('/all-post', async (req,res) => {
  const post = await Post.find();
  res.status(200).json({post: post});
})

router.post('/:id/comments', async (req,res) => {
  const post = await Post.findById(req.params.id);
  const user = await User.findById(req.body.userId);
  await post.updateOne({
    $push: {
      comments: {
        name: user?.name,
        email: user?.email,
        profilePic: user?.profilePic,
        message: req.body.message
      }
    }
  });

  const getPost = await Post.find();

  try {
    res.status(200).json({post: getPost});
  } catch (error) {
    res.status(404).json("failed");
  }
  
})

router.patch('/:id/likes',  async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

module.exports = router;
