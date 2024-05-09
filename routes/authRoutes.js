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
    console.log(req.user.username);
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

  let userId ='';
  let username = '';

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
     userId = payload.id;
     username = payload.username;
  

  } catch (e) {
    res.send({ user: null });
    return;
  }

  if(!userId){
    res.send({ user: null });
    return;
  }

  res.send({ user: userId, username: username});
  console.log(userId, username);
});

module.exports = router;
