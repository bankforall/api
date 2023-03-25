const getProfile = async (req, res) => {
  return res.status(200).json({
    _id: req.user._id,
    fullname: req.user.fullname,
    email: req.user.email,
    phoneNumber: req.user.phoneNumber,
    creditScore: req.user.creditScore,
    currentDE: req.user.currentDE,
    balance: req.user.balance,
    peerShareBalance: req.user.peerShareBalance,
  });
};

const getSummary = async (req, res) => {
  const peerShareBalance = req.user.peerShareBalance.reduce(
    (acc, cur) => acc + cur.balance,
    0
  );

  return res.status(200).json({
    balance: req.user.balance,
    peerShareBalance,
  });
};

module.exports = {
  getProfile,
  getSummary,
};
