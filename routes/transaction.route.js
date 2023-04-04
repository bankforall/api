const router = require("express").Router();
const transactionController = require("../controllers/transaction.controller");

const passport = require("passport");

// TODO: Add swagger documentation for deposit
router.post(
  "/deposit",
  passport.authenticate("jwt", { session: false }),
  transactionController.deposit
);

// TODO: Add swagger documentation for withdraw
router.post(
  "/withdraw",
  passport.authenticate("jwt", { session: false }),
  transactionController.withdraw
);

module.exports = router;
