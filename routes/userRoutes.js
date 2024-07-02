// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/UserController');

const router = express.Router();

router.post('/user', userController.createUser);
router.get('/user', userController.getAllUsers);
router.get('/user/:id', userController.getUserById);
router.put('/user/:id', userController.updateUserById);
router.delete('/user/:id', userController.deleteUserById);
router.update('/user/key', userController.addOpenAiKey);
router.delete('/user/key', userController.removeOpenAiKey);
module.exports = router;
