const express = require("express");

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const passport = require("passport");
const cors = require("cors");

const connectDB = require("./database/connect");

require("dotenv").config();
require("./config/passport")(passport);

(async () => {
  try {
    await connectDB();
  } catch (error) {
    console.log(error);
  }
})();

const port = process.env.PORT || 5000;

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bank For All Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://github.com/bankforall/api/blob/main/LICENSE",
      },
      contact: {
        name: "Bank For All",
        url: "https://github.com/bankforall",
      },
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
    components: {
      securitySchemas: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.route.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, { explorer: true })
);

// Routes
app.use("/auth", require("./routes/auth.route"));
app.use("/users", require("./routes/user.route"));
app.use("/transactions", require("./routes/transaction.route"));
app.use("/peershare-rooms", require("./routes/peershare-room.route"));

app.get("/", (req, res) => {
  return res
    .status(200)
    .send(
      "Welcome to Bank For All API if you want to see the documentation please go to <a href='/docs'>/docs</a>"
    );
});

app.listen(port, () => console.log(`Server running on port ${port}`));