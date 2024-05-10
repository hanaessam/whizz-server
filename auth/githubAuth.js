const passport = require("passport");
var GitHubStrategy = require("passport-github").Strategy;
const jwt = require('jsonwebtoken');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `http://localhost:8888/auth/github/callback`,
    },
    (__, _, profile, cb) => {
     
      let user = {
        userId: profile.id,
        name: profile.displayName,
        username: profile.username,
      }
     
      cb(null, {
        ...user,
        accessToken: jwt.sign(
          user,
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "1y",
          }
        ),
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