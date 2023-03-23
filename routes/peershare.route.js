const router = require("express").Router();
const passport = require("passport");
const {
  getAllPeerShare,
  getPeerShareSummary,
} = require("../controllers/peershare.controller");

router.get(
  "/summary",
  passport.authenticate("jwt", { session: false }),
  getPeerShareSummary
);
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getAllPeerShare
);

module.exports = router;
