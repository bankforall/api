const passport = require("passport");
const router = require("express").Router();
const { signIn, signUp } = require("../controllers/auth.controller");

router.post(
  "/signin",
  passport.authenticate("local-signin", { session: false }),
  signIn
);

router.post(
  "/signup",
  passport.authenticate("local-signup", { session: false }),
  signUp
);

module.exports = router;
