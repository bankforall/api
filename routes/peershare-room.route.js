const router = require("express").Router();
const passport = require("passport");
const peershareRoomController = require("../controllers/peershare-room.controller");

router.post(
  "/join/:inviteCode",
  passport.authenticate("jwt", { session: false }),
  peershareRoomController.joinRoom
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  peershareRoomController.createRoom
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  peershareRoomController.getAllRooms
);

router.get(
  "/:id/member",
  passport.authenticate("jwt", { session: false }),
  peershareRoomController.getAllMembersInRoom
);

router.post(
  "/pay",
  passport.authenticate("jwt", { session: false }),
  peershareRoomController.payForPeerShare
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  peershareRoomController.getRoomById
);

module.exports = router;
