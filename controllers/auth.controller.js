const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/token");

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }

    return res.status(200).json({
      access_token: generateToken(user._id),
    });
  } catch (error) {
    console.log(error);
  }
};

const signUp = async (req, res) => {
  try {
    const { fullname, email, password, phoneNumber } = req.body;

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({
        message: "User already exist",
      });
    }

    const phoneNumberExist = await User.findOne({ phoneNumber: phoneNumber });

    if (phoneNumberExist) {
      return res.status(400).json({
        message: "Phone number already exist",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    return res.status(200).json({
      access_token: generateToken(user._id),
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signIn,
  signUp,
};
