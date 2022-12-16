const express = require("express");
const auth = require("../middleware/auth");
const { User } = require("../models/User");
const multer = require("multer");
const router = express.Router();
const fs = require("fs");

const { promisify } = require("util");

const unlinkAsync = promisify(fs.unlink);

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

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  const detail = {
    name: user.name,
    email: user.email,
    _id: user._id,
    Bio: user.Bio,
    address: user.address,
    profilePic: user.profilePic,
  };

  const follower = user.followers;
  const following = user.followings;

  res.send({ detail: detail, follower: follower, following: following });
});

router.post(
  "/updateProfile",
  [auth, upload.single("image")],
  async (req, res) => {
    const imageDelete = await User.findById(req.user._id).select("-password");
    if (req.file?.filename) {
      await unlinkAsync(`public/images/${imageDelete?.profilePic}`);
    }
    await User.findByIdAndUpdate(req.user._id, {
      name: req.body.name,
      profilePic: req.file?.filename,
      Bio: req.body.Bio,
      address: req.body.address,
    });
    const user = await User.findById(req.user._id).select("-password");
    await User.updateMany(
      { "followers.email": user.email },
      { $set: { "followers.$.profilePic": req.file?.filename } }
    );
    await User.updateMany(
      { "followings.email": user.email },
      { $set: { "followings.$.profilePic": req.file?.filename } }
    );
    const detail = {
      name: user.name,
      email: user.email,
      _id: user._id,
      Bio: user.Bio,
      address: user.address,
      profilePic: user.profilePic,
    };
    const follower = user.followers;
    const following = user.followings;
    res
      .status(200)
      .json({ detail: detail, follower: follower, following: following });
  }
);

router.get("/all-user", auth, async (req, res) => {
  const user = await User.find().select("-password");
  try {
    res.status(200).json({ user: user });
  } catch (error) {}
});

router.get("/search", auth, async (req, res) => {
  const user= await User.find({name: {$regex: req.query.name,  $options: 'i'}}).select("-password");;
  res.status(200).json({result: user})
});

router.post("/follow", auth, async (req, res) => {
  const currentUser = await User.findById(req.user._id).select("-password");
  const user = await User.findById(req.body.id).select("-password");

  if (!user.followers.find((data) => data.email === currentUser.email)) {
    await currentUser.updateOne({
      $push: {
        followings: {
          email: user.email,
          name: user.name,
          profilePic: user.profilePic,
          Bio: user.Bio,
        },
      },
    });

    await User.updateOne(
      {
        _id: req.body.id,
      },
      {
        $push: {
          followers: {
            email: currentUser.email,
            name: currentUser.name,
            profilePic: currentUser.profilePic,
            Bio: currentUser.Bio,
          },
        },
      }
    );
    const result = await User.findById(req.user._id).select("-password");
    const result1 = await User.findById(req.body.id).select("-password");
    const following = result.followings;
    const follower = result1.followers;

    res.status(200).json({ following: following, follower: follower });
  } else {
    res.status(200).json("You already follow this user");
  }
});

router.post("/unfollow", auth, async (req, res) => {
  const currentUser = await User.findById(req.user._id).select("-password");
  const user = await User.findById(req.body.id).select("-password");

  if (user.followers.find((data) => data.email === currentUser.email)) {
    await currentUser.updateOne({
      $pull: {
        followings: {
          email: user.email,
          name: user.name,
          profilePic: user.profilePic,
          Bio: user.Bio,
        },
      },
    });

    await User.updateOne(
      {
        _id: req.body.id,
      },
      {
        $pull: {
          followers: {
            email: currentUser.email,
            name: currentUser.name,
            profilePic: currentUser.profilePic,
            Bio: currentUser.Bio,
          },
        },
      }
    );

    const result = await User.findById(req.user._id).select("-password");
    const result1 = await User.findById(req.body.id).select("-password");
    const following = result.followings;
    const follower = result1.followers;

    res.status(200).json({ following: following, follower: follower });
  } else {
    res.status(200).json("You already follow this user");
  }
});

router.get("/following", auth, async (req, res) => {
  const users = await User.findById(req.user._id).select("followings");
  res.send(users);
});

router.get("/follower", auth, async (req, res) => {
  const users = await User.findById(req.user._id).select("followers");
  res.send(users);
});

router.get("/:id", auth, async (req, res) => {
  const users = await User.findById(req.params.id).select("-password");
  res.send(users);
});

// router.get("/abc", auth, async (req, res) => {
//   const user = await User.find().select("-password");
//   try {
//     res.status(200).json({ user: user });
//   } catch (error) {}
// });

module.exports = router;
