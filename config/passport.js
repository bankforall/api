const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/user.model");

module.exports = (passport) => {
  passport.use(
    new jwtStrategy(
      {
        jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
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
