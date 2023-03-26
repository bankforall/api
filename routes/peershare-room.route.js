const router = require("express").Router();
const passport = require("passport");
const {
  createRoom,
  joinRoom,
  getAllRooms,
  getAllMembersInRoom,
  payForPeerShare,
  getRoomById,
} = require("../controllers/peershare-room.controller");

router.post(
  "/join/:inviteCode",
  passport.authenticate("jwt", { session: false }),
  joinRoom
);

router.post("/", passport.authenticate("jwt", { session: false }), createRoom);

router.get("/", passport.authenticate("jwt", { session: false }), getAllRooms);

router.get(
  "/:id/member",
  passport.authenticate("jwt", { session: false }),
  getAllMembersInRoom
);

router.post(
  "/pay",
  passport.authenticate("jwt", { session: false }),
  payForPeerShare
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getRoomById
);

module.exports = router;
