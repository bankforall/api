const getProfile = async (req, res) => {
  return res.status(200).json({
    _id: req.user._id,
    fullname: req.user.fullname,
    email: req.user.email,
    phoneNumber: req.user.phoneNumber,
    balance: req.user.balance,
  });
};

module.exports = {
  getProfile,
};
