const User = require("../models/user.model");

const getAllPeerShare = (req, res) => {
  return res.status(200).json({
    message: "GET ALL PEER SHARE",
  });
};

const getPeerShareSummary = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      peerShareBalance: user.peerShareBalance,
      currentDE: user.currentDE,
      creditScore: user.creditScore,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again later" });
  }
};

module.exports = {
  getAllPeerShare,
  getPeerShareSummary,
};
