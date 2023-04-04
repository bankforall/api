const router = require("express").Router();
const passport = require("passport");

const userController = require("../controllers/user.controller");

// TODO: Add swagger documentation for getProfile
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  userController.getProfile
);

// TODO: Add swagger documentation for getSummary
router.get(
  "/summary",
  passport.authenticate("jwt", { session: false }),
  userController.getSummary
);

module.exports = router;
