const router = require("express").Router();
const passport = require("passport");
const {
  createRoom,
  joinRoom,
  getAllRooms,
} = require("../controllers/peershare-room.controller");

// router.post("/", passport.authenticate("jwt", { session: false }), createRoom);

router.post(
  "/join/:id",
  passport.authenticate("jwt", { session: false }),
  joinRoom
);

router
  .route(
    "/",
    passport.authenticate("jwt", {
      session: false,
    })
  )
  .get(getAllRooms)
  .post(createRoom);

module.exports = router;
