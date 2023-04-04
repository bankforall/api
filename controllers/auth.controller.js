const User = require("../models/user.model");
const {
  loginSchema,
  registerSchema,
} = require("../validations/auth.validation");

const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/token");

const signIn = async (req, res) => {
  try {
    if (loginSchema.validate(req.body).error) {
      return res.status(400).json({ message: "Invalid data" });
    }

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

    const token = generateToken(user._id);

    res.setHeader(
      "Set-Cookie",
      `token=${token}; HttpOnly; Path=/; Max-Age=7200; SameSite=Strict; Secure;`
    );

    return res.status(200).json({
      access_token: token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again later" });
  }
};

const signUp = async (req, res) => {
  try {
    if (registerSchema.validate(req.body).error) {
      return res.status(400).json({ message: "Invalid data" });
    }

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

    const token = generateToken(user._id);

    res.setHeader(
      "Set-Cookie",
      `token=${token}; HttpOnly; Path=/; Max-Age=7200; SameSite=Strict; Secure;`
    );

    return res.status(200).json({
      access_token: token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again later" });
  }
};

module.exports = {
  signIn,
  signUp,
};
