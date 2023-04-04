const router = require("express").Router();
const passport = require("passport");

const userController = require("../controllers/user.controller");

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  userController.getProfile
);

router.get(
  "/summary",
  passport.authenticate("jwt", { session: false }),
  userController.getSummary
);

module.exports = router;
