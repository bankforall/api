const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    peerShareBalance: [
      {
        peerShareRoom: {
          type: Schema.Types.ObjectId,
          ref: "PeerShareRoom",
        },
        balance: {
          type: Number,
          default: 0,
        },
      },
    ],
    creditScore: {
      type: String,
      default: "C",
    },
    currentDE: {
      type: Number,
      default: 0,
    },
  debt: [
      {
        peerShareRoom: {
          type: Schema.Types.ObjectId,
          ref: "PeerShareRoom",
        },
        amount: {
          type: Number,
          default: 0,
        },
      },
    ],
    avatar: {
      type: String,
      default:
        "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
