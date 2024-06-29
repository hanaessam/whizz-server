const express = require("express");
const router = express.Router();
const passport = require("../auth/githubAuth");
const jwt = require("jsonwebtoken");
const User = require('../models/User'); // Import your User model

// GitHub OAuth callback route
router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: '/login' }),
  async function (req, res) {
    try {
      // If authentication was successful, req.user will contain the authenticated user
      if (!req.user) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      // Check if the user already exists in the database
      let user = await User.findOne({ where: { githubToken: req.user.accessToken } });

      if (!user) {
        // If the user doesn't exist, create a new user in the database
        user = await User.create({
          username: req.user.username, // Adjust as per your GitHub authentication strategy
          githubToken: req.user.accessToken,
        });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Redirect to client with JWT token
      res.redirect(`http://localhost:54321/auth/${token}`);
    } catch (error) {
      console.error('Error in GitHub OAuth callback:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// Route to fetch current user info using JWT token
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

  // Fetch user details from the database
  const foundUser = await User.findByPk(user.userId);
  res.send({ user: foundUser });
});

module.exports = router;
