// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/UserController');

const router = express.Router();

router.post('/user', userController.createUser);
router.get('/user', userController.getAllUsers);
router.get('/user/:id', userController.getUserById);
router.put('/user/:id', userController.updateUserById);
router.delete('/user/:id', userController.deleteUserById);
router.put('/key/:id', userController.addOpenAiKey);
router.delete('/key/:id', userController.removeOpenAiKey);
router.get('/key/:id', userController.getOpenAiKey);
module.exports = router;
