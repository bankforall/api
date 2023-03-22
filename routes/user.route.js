const router = require("express").Router();
const passport = require("passport");
const { getProfile } = require("../controllers/user.controller");

router.get("/me", passport.authenticate("jwt", { session: false }), getProfile);

module.exports = router;
