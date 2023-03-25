const router = require("express").Router();
const passport = require("passport");
const {
  createRoom,
  joinRoom,
  getAllRooms,
} = require("../controllers/peershare-room.controller");

router.post("/", passport.authenticate("jwt", { session: false }), createRoom);

router.post(
  "/join",
  passport.authenticate("jwt", { session: false }),
  joinRoom
);

router.get("/", passport.authenticate("jwt", { session: false }), getAllRooms);

module.exports = router;
