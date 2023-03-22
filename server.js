const express = require("express");
const passport = require("passport");
const connectDB = require("./database/connect");
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const transactionRoute = require("./routes/transaction.route");
require("dotenv").config();
require("./config/passport")(passport);

connectDB();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/transaction", transactionRoute);

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "THIS IS AN API FOR BANK FOR ALL WEBSITE.",
  });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
