const express = require("express");
const connectDB = require("./database/connect");
const authRoute = require("./routes/auth.route");
require("dotenv").config();

connectDB();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use("/auth", authRoute);

app.listen(port, () => console.log(`Server running on port ${port}`));
