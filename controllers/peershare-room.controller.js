const PeerShareRoom = require("../models/peershare-room.model");
const User = require("../models/user.model");
const generateInviteCode = require("../utils/inviteCode");
const bcrypt = require("bcryptjs");
const {
  depositSchema,
  joinRoomSchema,
  createRoomSchema,
} = require("../validations/peershare.validation");

const createRoom = async (req, res) => {
  try {
    if (createRoomSchema.validate(req.body).error) {
      return res.status(400).json({ message: "Invalid body" });
    }

    let {
      roomName,
      paymentTermUnit,
      creditRequirement,
      maxMember,
      typeRoom,
      private,
      roomPassword,
      bidTimeOut,
      startBidDate,
      paymentTerm,
    } = req.body;
    const peerShareRoom = await PeerShareRoom.findOne({ roomName: roomName });

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
      roomName,
      paymentTerm,
      creditRequirement,
      maxMember,
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
      bidTimeOut,
      startBidDate,
      paymentTermUnit,
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
    if (joinRoomSchema.validate(req.body).error) {
      return res.status(400).json({
        message: "Invalid body",
      });
    }

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
      roomName: room.roomName,
      paymentTermUnit: room.paymentTermUnit,
      creditRequirement: room.creditRequirement,
      maxMember: room.maxMember,
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

const deposit = async (req, res) => {
  try {
    if (depositSchema.validate(req.body).error) {
      return res.status(400).json({
        message: "Invalid data",
      });
    }

    const { id: roomid, amount } = req.body;

    const user = await User.findOne({ _id: req.user._id });

    if (user.balance < amount) {
      return res.status(400).json({
        message: "Not enough balance",
      });
    }

    const peerShareRoom = await PeerShareRoom.findOne({ _id: roomid });

    if (!peerShareRoom) {
      return res.status(400).json({
        message: "Room does not exist",
      });
    }

    const isMember = peerShareRoom.members.find(
      (member) => member.user.toString() === req.user._id.toString()
    );

    if (!isMember) {
      return res.status(400).json({
        message: "You are not a member of this room",
      });
    }

    user.balance -= amount;

    if (user.peerShareBalance.length > 0) {
      const isRoomExist = user.peerShareBalance.find(
        (room) => room.peerShareRoom.toString() === roomid.toString()
      );

      if (isRoomExist) {
        isRoomExist.balance += amount;
      } else {
        user.peerShareBalance.push({
          peerShareRoom: roomid,
          balance: amount,
        });
      }
    }

    await user.save();

    return res.status(200).json({
      message: "Deposit success",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong, please try again later",
    });
  }
};

const getRoomById = async (req, res) => {};

module.exports = {
  createRoom,
  joinRoom,
  getAllRooms,
  getAllMembersInRoom,
  deposit,
  getRoomById,
};
