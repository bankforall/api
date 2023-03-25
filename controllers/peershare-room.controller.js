const PeerShareRoom = require("../models/peershare-room.model");

const createRoom = async (req, res) => {
  try {
    const {
      groupName,
      paymentTerm,
      creditRequest,
      noHand,
      typeRoom,
      private,
      roomPassword,
    } = req.body;

    const peerShareRoom = await PeerShareRoom.findOne({ groupName: groupName });

    if (peerShareRoom) {
      return res.status(400).json({
        message: "Room already exist",
      });
    }

    const newPeerShareRoom = await PeerShareRoom.create({
      groupName,
      paymentTerm,
      creditRequest,
      noHand,
      typeRoom,
      private,
      roomPassword,
      members: [
        {
          user: req.user._id,
          role: "admin",
        },
      ],
    });

    return res.status(200).json({
      message: "Room created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong, please try again later",
    });
  }
};

const joinRoom = async (req, res) => {
  try {
    
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong, please try again later",
    });
  }
};

const getAllRooms = async (req, res) => {
  const rooms = await PeerShareRoom.find({});

  return res.status(200).json(rooms);
};

module.exports = {
  createRoom,
  joinRoom,
  getAllRooms,
};
