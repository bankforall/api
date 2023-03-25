const { Schema, model } = require("mongoose");

const peerShareRoomSchema = new Schema(
  {
    roomName: {
      type: String,
      required: true,
      unique: true,
    },
    paymentTerm: {
      type: Number,
      required: true,
    },
    creditRequirement: {
      type: String,
      required: true,
    },
    maxMember: {
      type: Number,
      required: true,
    },
    typeRoom: {
      type: String,
      required: true,
      enum: ["Fix", "Float"],
    },
    private: {
      type: Boolean,
      required: true,
    },
    inviteCode: {
      type: String,
      unique: true,
    },
    roomPassword: {
      type: String,
      default: "",
    },
    bidTimeOut: {
      type: String,
      required: true,
    },
    paymentTermUnit: {
      type: String,
      required: true,
    },
    startBidDate: {
      type: Date,
      required: true,
    },
    bidRound: {
      type: Number,
      default: 1,
    },
    members: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        role: {
          type: String,
          default: "member",
          enum: ["member", "admin"],
        },
        isBidden: {
          type: Boolean,
          default: false,
        },
        isPaid: {
          type: Boolean,
          default: false,
        },
        isWinner: {
          type: Boolean,
          default: false,
        },
        bidRate: {
          type: Number,
          default: 0,
        },
      },
    ],
    history: [
      {
        round: {
          type: Number,
          default: 1,
        },
        winner: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        bidRate: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("PeerShareRoom", peerShareRoomSchema);
