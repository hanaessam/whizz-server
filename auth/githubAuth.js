const passport = require("passport");
var GitHubStrategy = require("passport-github").Strategy;
const jwt = require('jsonwebtoken');

passport.serializeUser((user, done) => {
  done(null, user.accessToken);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `http://localhost:${process.env.PORT}/auth/github/callback`,
    },
    (__, _, profile, cb) => {
      console.log(profile);
      cb(null, {
        accessToken: jwt.sign({ id: profile.id }, process.env.JWT_SECRET, {expiresIn: "1y"}),
        profile: profile,
      });
    }
  )
);

passport.deserializeUser((id, done) => {
  id,
    function (err, user) {
      done(err, user);
    };
});

module.exports = passport;