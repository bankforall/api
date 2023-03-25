const router = require("express").Router();
const passport = require("passport");
const {
  createRoom,
  joinRoom,
  getAllRooms,
  getAllMembersInRoom,
} = require("../controllers/peershare-room.controller");

router.post(
  "/join/:inviteCode",
  passport.authenticate("jwt", { session: false }),
  joinRoom
);

router.post("/", passport.authenticate("jwt", { session: false }), createRoom);

router.get("/", passport.authenticate("jwt", { session: false }), getAllRooms);

router.get("/:id/member", getAllMembersInRoom);

module.exports = router;
