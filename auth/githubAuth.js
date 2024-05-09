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
      callbackURL: `http://localhost:8888/auth/github/callback`,
    },
    (__, _, profile, cb) => {
     
    

       // Create a JWT token with the user data
       const user = {
        accessToken: jwt.sign({ id: profile.id, username: profile.username }, process.env.JWT_SECRET, {expiresIn: "1y"}),
        profile: profile
      };
      
      cb(null, user);
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