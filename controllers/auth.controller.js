const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/token");

const signIn = async (req, res) => {
  try {
    return res.status(200).json({
      access_token: generateToken(req.user._id),
    });
  } catch (error) {
    console.log(error);
  }
};

const signUp = async (req, res) => {
  try {
    return res.status(200).json({
      access_token: generateToken(req.user._id),
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signIn,
  signUp,
};
