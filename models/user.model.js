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
    peerShareBalance: {
      type: Number,
      default: 0,
    },
    balance: {
      type: Number,
      default: 0,
    },
    creditScore: {
      type: String,
      default: "C",
    },
    currentDE: {
      type: String,
      default: "0",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
