const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("..//models/User");
const key = require("./key").secret_key;

const options = {
  // extract token from headers as a bearer
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: key,
};

// setting passport to use jsonwebtokens
module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      User.findById(jwt_payload._id)
        .then((user) => {
          if (user) return done(null, user);
          return done(null, false);
        })
        .catch((err) => {
          console.log(err);
        });
    })
  );
};
