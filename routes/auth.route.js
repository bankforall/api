const router = require("express").Router();

const authController = require("../controllers/auth.controller");
// TODO: Add swagger documentation for sign-in
router.post("/sign-in", authController.signIn);

// TODO: Add swagger documentation for sign-up
router.post("/sign-up", authController.signUp);

module.exports = router;
