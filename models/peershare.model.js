const { model, Schema } = require("mongoose");

const peerShareSchema = new Schema(
  {
    user: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    poolAmount: {
      type: Number,
      default: 0,
    },
    bidDueDate: {
      type: Date,
      required: true,
    },
    maxMembers: {
      type: Number,
      required: true,
    },
    minimumCreditScore: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model("PeerShare", peerShareSchema);
