const router = require("express").Router();
const passport = require("passport");
const { getProfile, getSummary } = require("../controllers/user.controller");

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  getProfile
);

router.get(
  "/summary",
  passport.authenticate("jwt", { session: false }),
  getSummary
);

module.exports = router;
