const { Schema, model } = require("mongoose");

const peerShareRoomSchema = new Schema(
  {
    groupName: { //ชื่อกลุ่มเปียแชร์
      type: String,
      required: true,
      unique: true,
    },
    paymentTerm: { //แต่ละคนต้องจ่ายเท่าไหร่
      type: Number,
      required: true,
    },
    creditRequest: { //Credit Score แบ่งตามเกณฑ์  A B C D รับมาจาก FrontEnd เลย
      type: String,
      required: true,
    },
    noHand: { //มีกี่คนในห้อง
      type: Number,
      required: true,
    },
    typeRoom: { //ประเภท float หรืออะไรซักอย่าง
      type: String,
      required: true,
    },
    private: { //วงปิดหรือเปิด
      type: Boolean,
      required: true,
    },
    members: [ //จำนวนสมาชิก
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
    inviteCode: { //รหัสชวนเข้ากลุ่ม
      type: String,
      unique: true,
    },
    roomPassword: { //รหัสกลุ่ม
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, //let MongoDB know that it must take timestamp
  }
);

module.exports = model("PeerShareRoom", peerShareRoomSchema);
