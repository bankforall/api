const { Schema, model } = require("mongoose");

const peerShareRoomSchema = new Schema(
  {
    groupName: {
      type: String,
      required: true,
      unique: true,
    },
    paymentTerm: {
      type: Number,
      required: true,
    },
    creditRequest: {
      type: String,
      required: true,
    },
    noHand: {
      type: Number,
      required: true,
    },
    typeRoom: {
      type: String,
      required: true,
    },
    private: {
      type: Boolean,
      required: true,
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
      },
    ],
    inviteCode: {
      type: String,
      unique: true,
    },
    roomPassword: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("PeerShareRoom", peerShareRoomSchema);
