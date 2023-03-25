const PeerShareRoom = require("../models/peershare-room.model");
const generateInviteCode = require("../utils/inviteCode");
const bcrypt = require("bcryptjs");

const createRoom = async (req, res) => {
  try {
    let {
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

    const inviteCode = generateInviteCode();

    if (private) {
      if (!roomPassword) {
        return res.status(400).json({
          message: "Please enter password",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedRoomPassword = await bcrypt.hash(roomPassword, salt);

      roomPassword = hashedRoomPassword;
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
      inviteCode,
    });

    return res.status(200).json({
      inviteCode: newPeerShareRoom.inviteCode,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong, please try again later",
    });
  }
};

const joinRoom = async (req, res) => {
  try {
    const { inviteCode } = req.params;
    const { roomPassword } = req.body;

    const peerShareRoom = await PeerShareRoom.findOne({
      inviteCode: inviteCode,
    });

    if (!peerShareRoom) {
      return res.status(400).json({
        message: "Room does not exist",
      });
    }

    if (peerShareRoom.private) {
      if (!roomPassword) {
        return res.status(400).json({
          message: "Please enter password",
        });
      }

      if (!bcrypt.compareSync(roomPassword, peerShareRoom.roomPassword)) {
        return res.status(400).json({
          message: "Incorrect password",
        });
      }
    }

    const isMember = peerShareRoom.members.find(
      (member) => member.user.toString() === req.user._id.toString()
    );

    if (isMember) {
      return res.status(400).json({
        message: "You are already a member of this room",
      });
    }

    peerShareRoom.members.push({
      user: req.user._id,
    });

    await peerShareRoom.save();

    return res.status(200).json({
      message: "You have successfully joined the room",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong, please try again later",
    });
  }
};

const getAllRooms = async (req, res) => {
  let rooms = await PeerShareRoom.find({});

  rooms = rooms.map((room) => {
    return {
      id: room._id,
      groupName: room.groupName,
      paymentTerm: room.paymentTerm,
      creditRequest: room.creditRequest,
      noHand: room.noHand,
      typeRoom: room.typeRoom,
      private: room.private,
      members: room.members,
      inviteCode: room.inviteCode,
      updatedAt: room.updatedAt,
      createdAt: room.createdAt,
    };
  });

  return res.status(200).json(rooms);
};

const getAllMembersInRoom = async (req, res) => {
  const { id } = req.params;
  const rooms = await PeerShareRoom.findOne({ _id: id });
  const members = rooms.members;
  return res.status(200).json(members);
};

module.exports = {
  createRoom,
  joinRoom,
  getAllRooms,
  getAllMembersInRoom,
};
