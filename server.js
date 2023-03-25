const express = require("express");
const passport = require("passport");
const connectDB = require("./database/connect");
require("dotenv").config();
require("./config/passport")(passport);

connectDB();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use("/auth", require("./routes/auth.route"));
app.use("/user", require("./routes/user.route"));
app.use("/transaction", require("./routes/transaction.route"));

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "THIS IS AN API FOR BANK FOR ALL WEBSITE.",
  });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
