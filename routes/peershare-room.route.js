const router = require("express").Router();
const passport = require("passport");
const peershareRoomController = require("../controllers/peershare-room.controller");

// TODO: Add swagger documentation for joinRoom
router.post(
  "/join/:inviteCode",
  passport.authenticate("jwt", { session: false }),
  peershareRoomController.joinRoom
);

// TODO: Add swagger documentation for createRoom
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  peershareRoomController.createRoom
);

// TODO: Add swagger documentation for getAllRooms
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  peershareRoomController.getAllRooms
);

// TODO: Add swagger documentation for getAllMembersInRoom
router.get(
  "/:id/member",
  passport.authenticate("jwt", { session: false }),
  peershareRoomController.getAllMembersInRoom
);

// TODO: Add swagger documentation for getAllTransactionsInRoom
router.post(
  "/pay",
  passport.authenticate("jwt", { session: false }),
  peershareRoomController.payForPeerShare
);

// TODO: Add swagger documentation for getRoomById
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  peershareRoomController.getRoomById
);

module.exports = router;
