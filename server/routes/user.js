const express = require("express");
const auth = require("../middleware/auth");
const { User } = require("../models/User");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  const detail = {
    name: user.name,
    email: user.email,
    _id: user._id,
    bio: user.bio,
    profilePic: user.profilePic,
  };

  const follower = user.followers;
  const following = user.followings;

  res.send({ detail: detail, follower: follower, following: following });
});

router.get("/all-user", auth, async (req, res) => {
  const user = await User.find().select("-password");
  try {
    res.status(200).json({ user: user });
  } catch (error) {}
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

    res.status(200).json({following: following,follower: follower});
  } else {
    res.status(200).json("You already follow this user");
  }
});

router.post("/unfollow", auth, async (req, res) => {
  const currentUser = await User.findById(req.user._id).select("-password");
  const user = await User.findById(req.body.id).select(
    "-password"
  );

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

    res.status(200).json({following: following,follower: follower});
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

module.exports = router;
