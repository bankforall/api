const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    fullname: { //ชื่อผู้ใช้
      type: String,
      required: true,
    },
    email: { //อีเมลผู้ใช้เอง
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: { //เบอร์โทรศัพท์ผู้ใช้เอง
      type: String,
      required: true,
      unique: true,
    },
    password: { //password ที่ digest แล้ว
      type: String,
      required: true,
    },
    availableBalance: { //เงินที่มี
      type: Number,
      default: 0,
    },
    peerShareBalance: [ //เงินที่อยู่ในวงเปียแชร์ อาจแบ่ง subobject แบ่งตามกลุ่ม
      {
        group: { //ชี้ไปหากลุ่ม peer share อยู่ในก้อนกลุ่มเปียแชร์
          type: Schema.Types.ObjectId,
          ref: "PeerShareRoom",
        },
        groupBalance: { //ปริมาณ
          type: String,
          default: 0,
        },
      },
    ],
    totalBlance: { //เงินตามจริงเมื่อรวม availableBalance กับเงินในวง peerShareBalance
      type: Number,
      default: 0,
    },
    creditScore: { //เครดิตสกอร์
      type: String,
      default: "C",
    },
    debt: [ //หนี้ที่อยู่ในวงเปียแชร์ หรือวงต่าง ๆ
      {
        group: { //ชี้ไปหากลุ่ม peer share อยู่ในก้อนกลุ่มเปียแชร์
          type: Schema.Types.ObjectId,
          ref: "PeerShareRoom",
        },
        groupBalance: { //ปริมาณ
          type: String,
          default: 0,
        },
      },
    ],
    currentDE: { //ค่า D/E ของผู้ใช้ ต้องมาจากการคำนวณ 
      type: String, //ทุกครั้งที่มีความเปลี่ยนแปลงกับ peerShareBlance หรือ balance ของ User คนไหน ให้ทำการคำนวณค่า DE ของ User นั้นใหม่ทุกครั้ง
      default: "0",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
