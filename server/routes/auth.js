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
  if (!user) return res.status(400).send("Invalid Email...");

  let checkPassword = await bcrypt.compare(req.body.password, user.password);
  if (!checkPassword) return res.status(400).send("Invalid Password...");

  const token = user.generateAuthToken();
  res.send(token);
});

// function validate(req) {
//   const schema = {
//     email: Joi.string().required().email(),
//     password: Joi.string().min(8).required(),
//   };

//   return Joi.validate(req, schema);
// }

module.exports = router;
