const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { avatar, email, username, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.json({ msg: err.message });
      } else {
        const newuser = new UserModel({
          email,
          username,
          password: hash,
          avatar,
        });
        await newuser.save();
        res.json({ msg: "useradded", newuser });
      }
    });
  } catch (error) {
    res.json({ err: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    // console.log(user[0].password);
    console.log(user[0]);
    if (user) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        // console.log(password, user.password);
        if (result) {
          var token = jwt.sign(
            { userID: user[0]._id, name: user[0].username },
            "teju",
            {
              expiresIn: "7h",
            }
          );

          res.status(200).json({ msg: "Login success ful", token: token });
        } else {
          res.status(200).json({ msg: "wrong credentials" });
        }
      });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});
module.exports = {
  userRouter,
};
