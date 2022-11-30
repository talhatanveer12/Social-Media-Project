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
    profilePic: user.profilePic
  };

  const follower = user.followers;
  const following = user.followings;

  res.send({detail: detail, follower: follower,following: following});
});

router.post("/follow", auth, async (req, res) => {
  const currentUser = await User.findById("637c9660de573f5290f5123e").select("-password");
  const user = await User.findById("637c9421b0337f3a00ad8edc").select(
    "-password"
  );

  if (!user.followings.find((data) => data.email === currentUser.email)) {
    await currentUser.updateOne({
      $push: {
        followers: {
          email: user.email,
          name: user.name,
          profilePic: user.profilePic,
          Bio: user.Bio,
        },
      },
    });

    await User.updateOne(
      {
        email: req.body.email,
      },
      {
        $push: {
          followings: {
            email: currentUser.email,
            name: currentUser.name,
            profilePic: currentUser.profilePic,
            Bio: currentUser.Bio,
          },
        },
      }
    );

    res.status(200).json("Successfully");
  } else {
    res.status(200).json("You already follow this user");
  }
});

router.post("/unfollow", auth, async (req, res) => {
  const currentUser = await User.findById(req.user._id).select("-password");
  const user = await User.findById("637c967ade573f5290f51241").select(
    "-password"
  );

  if (user.followings.find((data) => data.email === currentUser.email)) {
    await currentUser.updateOne({
      $pull: {
        followers: {
          email: user.email,
          name: user.name,
          profilePic: user.profilePic,
          Bio: user.Bio,
        },
      },
    });

    await User.updateOne(
      {
        email: req.body.email,
      },
      {
        $pull: {
          followings: {
            email: currentUser.email,
            name: currentUser.name,
            profilePic: currentUser.profilePic,
            Bio: currentUser.Bio,
          },
        },
      }
    );

    res.status(200).json("Successfully");
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

router.get("/:id", auth, async (req,res) => {
  const users = await User.findById(req.params.id).select("-password");
  res.send(users);
})

module.exports = router;
