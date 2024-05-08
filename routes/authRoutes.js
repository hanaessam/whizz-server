const express = require('express');
const router = express.Router();
const passport = require('../auth/githubAuth');

router.get("/auth/github", passport.authenticate("github"));

router.get(
  "/auth/github/callback",
  passport.authenticate("github"),
  function (req, res) {
    const user = {
      accessToken: req.user.accessToken,
      id: req.user.profile.id,
      username: req.user.profile.username,
      displayName: req.user.profile.displayName,
      emails: req.user.profile.emails,
    };
    res.redirect(`http://localhost:54321/auth/${req.user.accessToken}`);
  }
);

module.exports = router;