const { User } = require("../models/User");
const express = require("express");
const router = express.Router();
//const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");

router.post("/register", async (req, res) => {
 // const { error } = validate(req.body);
 // if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("Email already exits....");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  user.password = await bcrypt.hash(user.password, 10);

  await user.save();

  const token = user.generateAuthToken();

  res.header("x-auth-token", token).send(_.pick(user, ["name", "email"]));
});

router.post("/login", async (req, res) => {
  //const { error } = validate(req.body);
  //if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(422).json({error: "Invalid Email and Password"});

  let checkPassword = await bcrypt.compare(req.body.password, user.password);
  if (!checkPassword) return res.status(422).json({error: "Invalid Email and Password"});



  const token = user.generateAuthToken();
  user.password = null;
  const detail = {
    name: user.name,
    email: user.email,
    _id: user._id,
    bio: user.bio,
    profilePic: user.profilePic
  };

  const follower = user.followers;
  const following = user.followings;
  res.json({status: 'Login',token: token,user: user,detail: detail, follower: follower,following: following});
});

// function validate(req) {
//   const schema = {
//     email: Joi.string().required().email(),
//     password: Joi.string().min(8).required(),
//   };

//   return Joi.validate(req, schema);
// }

module.exports = router;
