const User = require("../models/user.model");
const {
  depositSchema,
  withdrawSchema,
} = require("../validations/transaction.validation");

const deposit = async (req, res) => {
  try {
    if (depositSchema.validate(req.body).error) {
      return res.status(400).json({ message: "Invalid body" });
    }

    const { amount } = req.body;

    const user = await User.findOne({ _id: req.user._id });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    user.balance += amount;

    await user.save();

    return res.status(200).json({
      message: "deposit has been created successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again later" });
  }
};

const withdraw = async (req, res) => {
  try {
    if (withdrawSchema.validate(req.body).error) {
      return res.status(400).json({ message: "Invalid body" });
    }

    const { amount } = req.body;

    const user = await User.findOne({ _id: req.user._id });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    user.balance -= amount;

    await user.save();

    return res.status(200).json({
      message: "Withdraw has been created successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again later" });
  }
};

module.exports = {
  deposit,
  withdraw,
};
