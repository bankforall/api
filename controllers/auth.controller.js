const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/token");

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }

    const checkPasswordMatch = await bcrypt.compare(password, user.password);

    if (!checkPasswordMatch) {
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

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const phoneNumberExists = await User.findOne({ phoneNumber: phoneNumber });

    if (phoneNumberExists) {
      return res.status(400).json({
        message: "Phone number already exists",
      });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    return res.status(200).json({
      access_token: generateToken(newUser._id),
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signIn,
  signUp,
};
