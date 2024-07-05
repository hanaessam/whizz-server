const express = require('express');
const userController = require('../controllers/UserController');

const router = express.Router();

router.put('/key/:id', userController.addOpenAiKey);
router.delete('/key/:id', userController.removeOpenAiKey);
router.get('/key/:id', userController.getOpenAiKey);

module.exports = router;
