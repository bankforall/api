const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

module.exports = (passport) => {
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        const userExists = await User.findOne({ email: email });

        if (userExists) {
          return done(null, false, { message: "User already exists" });
        } else {
          const salt = await bcrypt.genSalt(12);
          const hashedPassword = await bcrypt.hash(password, salt);

          const newUser = await User.create({
            fullname: req.body.fullname,
            email,
            password: hashedPassword,
            phoneNumber: req.body.phoneNumber,
          });

          return done(null, newUser);
        }
      }
    )
  );

  passport.use(
    "local-signin",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        const user = await User.findOne({ email: email });

        if (!user) {
          return done(null, false, { message: "User does not exist" });
        } else {
          const checkPasswordMatch = await bcrypt.compare(
            password,
            user.password
          );

          if (!checkPasswordMatch) {
            return done(null, false, { message: "Incorrect password" });
          }

          return done(null, user);
        }
      }
    )
  );

  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET_KEY,
      },
      async (jwt_payload, done) => {
        const user = await User.findOne({ _id: jwt_payload.id });
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      }
    )
  );
};
