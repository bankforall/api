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

    const date = new Date(startBidDate);
    date.setHours(date.getHours() + 7);

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
          fullname: req.user.fullname,
          credit: req.user.creditScore,
          avatar: req.user.avatar,
          phoneNumber: req.user.phoneNumber,
          bitRate: req.user.bitRate,
          interest: req.user.interest,
          totalInterest: req.user.totalInterest,
        },
      ],
      inviteCode,
      bidTimeOut,
      startBidDate: date,
      paymentTermUnit,
    });

    return res.status(200).json(newPeerShareRoom);
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
      fullname: req.user.fullname,
      credit: req.user.creditScore,
      avatar: req.user.avatar,
      phoneNumber: req.user.phoneNumber,
      credit: req.user.creditScore,
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

const payForPeerShare = async (req, res) => {
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
      }
    } else {
      user.peerShareBalance.push({
        peerShareRoom: roomid,
        balance: amount,
      });
    }

    await user.save();

    peerShareRoom.members.forEach((member) => {
      if (member.user.toString() === req.user._id.toString()) {
        member.isPaid = true;
      }
    });

    await peerShareRoom.save();

    return res.status(200).json(peerShareRoom);
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong, please try again later",
    });
  }
};

const getRoomById = async (req, res) => {
  const { id } = req.params;

  const room = await PeerShareRoom.findOne({ _id: id });

  return res.status(200).json(room);
};

const biding = async (req, res) => {
  try {
    return res.status(200).json({ message: "Biding" });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong, please try again later",
    });
  }
};

const checkForStart = async (req, res) => {
  try {
    const { id } = req.params;

    const peerShareRoom = await PeerShareRoom.findOne({ _id: id });

    if (!peerShareRoom) {
      return res.status(400).json({
        message: "Room does not exist",
      });
    }

    const isAllPaid = peerShareRoom.members.every((member) => member.isPaid);

    const now = new Date();
    const startBidDate = new Date(peerShareRoom.startBidDate);

    if (now > startBidDate && !isAllPaid) {
      const user = await User.findOne({ _id: req.user._id });

      user.peerShareBalance.forEach((room) => {
        if (room.peerShareRoom.toString() === peerShareRoom._id.toString()) {
          user.balance += room.balance;
          room.balance = 0;

          peerShareRoom.members.forEach((member) => {
            if (member.user.toString() === user._id.toString()) {
              member.isPaid = false;
            }
          });

          peerShareRoom.save();
        }
      });

      user.peerShareBalance = user.peerShareBalance.filter(
        (room) => room.balance > 0
      );

      await user.save();

      const deleteRoom = await PeerShareRoom.deleteOne({
        _id: peerShareRoom._id,
      });

      return res.status(400).json({
        readyForBid: false,
      });
    }

    if (!isAllPaid) {
      return res.status(400).json({
        readyForBid: false,
      });
    }

    return res.status(200).json({
      readyForBid: true,
      countMemberPaid: peerShareRoom.members.length,
      maxMember: peerShareRoom.maxMember,
      startBidDate: peerShareRoom.startBidDate,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong, please try again later",
    });
  }
};

module.exports = {
  createRoom,
  joinRoom,
  getAllRooms,
  getAllMembersInRoom,
  payForPeerShare,
  getRoomById,
  biding,
  checkForStart,
};
