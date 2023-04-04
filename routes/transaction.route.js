const router = require("express").Router();
const transactionController = require("../controllers/transaction.controller");

const passport = require("passport");

router.post(
  "/deposit",
  passport.authenticate("jwt", { session: false }),
  transactionController.deposit
);

router.post(
  "/withdraw",
  passport.authenticate("jwt", { session: false }),
  transactionController.withdraw
);

module.exports = router;
