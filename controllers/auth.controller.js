const signIn = (req, res) => {
  return res.status(200).json({
    message: "Sign In",
  });
};

const signUp = (req, res) => {
  return res.status(200).json({
    message: "Sign Up",
  });
};

module.exports = {
  signIn,
  signUp,
};
