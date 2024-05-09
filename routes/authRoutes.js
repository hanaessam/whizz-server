const express = require("express");
const router = express.Router();
const passport = require("../auth/githubAuth");
const jwt = require("jsonwebtoken");

router.get("/auth/github", passport.authenticate("github"));

router.get(
  "/auth/github/callback",
  passport.authenticate("github"),
  function (req, res) {
    res.redirect(`http://localhost:54321/auth/${req.user.accessToken}`);
  }
);

router.get("/me", async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.send({ user: null });
    return;
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    res.send({ user: null });
    return;
  }

  let user = null;

  try {
    user = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    res.send({ user: null });
    return;
  }

  if (!user || !user.userId) {
    res.send({ user: null });
    return;
  }

  res.send({ user });
});

module.exports = router;
