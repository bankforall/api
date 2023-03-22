const router = require("express").Router();
const { deposit, withdraw } = require("../controllers/transaction.controller");
const passport = require("passport");

router.post(
  "/deposit",
  passport.authenticate("jwt", { session: false }),
  deposit
);

router.post(
  "/withdraw",
  passport.authenticate("jwt", { session: false }),
  withdraw
);

module.exports = router;