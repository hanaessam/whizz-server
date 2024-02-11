const passport = require("passport");
const session = require("express-session");
const config = require("dotenv").config;
var GitHubStrategy = require("passport-github").Strategy;

class GitHubAuth {
  constructor(app) {
    this.app = app;
  }

  initialize() {
    this.app.use(passport.initialize());
    this.app.use(passport.session());

    passport.serializeUser(function (user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
      done(null, { id: id });
    });
  }

  setupGitHubStrategy() {
    config();
    passport.use(
      new GitHubStrategy(
        {
          clientID: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
          callbackURL: `http://localhost:8888/auth/github/callback`,
        },
        function (accessToken, refreshToken, profile, cb) {
          console.log(profile);
          cb(null, {
            id: profile.id,
            accessToken: accessToken,
            refreshToken: refreshToken,
          });
        }
      )
    );
  }

  setupGitHubRoutes() {
    this.app.get("/auth/github", passport.authenticate("github"));

    this.app.get(
      "/auth/github/callback",
      passport.authenticate("github"),
      function (req, res) {
        res.send("Authenticated with github!");
      }
    );
  }
}

module.exports = GitHubAuth;
