const express = require('express');
const passport = require('../auth/localAuth');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const secretKey = 'boat_yogurt_khofo'; 

const checkAndRemoveExpiredKey = async (user) => {
  if (user.openAiKeyExpiry && user.openAiKeyExpiry < new Date()) {
    user.openAiKey = null;
    user.openAiKeyExpiry = null;
    await user.save();
  }
};
// Sign-Up Route
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!(email && password)) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const openAiKey = process.env.OPENAI_API_KEY;
    const openAiKeyExpiry = new Date(Date.now() +  7 * 24 * 60 * 60 * 1000);

    // Create a new user
    const newUser = await User.create({ email, password , openAiKey, openAiKeyExpiry});
    // Return a sanitized response (exclude password)
    const sanitizedUser = {
        id: newUser.id,
        username: newUser.email,
        email: newUser.email,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
        openAiKey: newUser.openAiKey,
        openAiKeyExpiry: newUser.openAiKeyExpiry
      };
      res.status(201).json(sanitizedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login Route
router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ error: info.message });

    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ token, userId: user.id, key: user.openAiKey, keyExpiry: user.openAiKeyExpiry});
  })(req, res, next);
});

// Get current user info
router.get('/me', async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.send({ user: null });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.send({ user: null });
  }

  let user = null;

  try {
    user = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return res.send({ user: null });
  }

  if (!user || !user.userId) {
    return res.send({ user: null });
  }

  const foundUser = await User.findByPk(user.userId);
  res.send({ user: foundUser });
});

module.exports = router;
