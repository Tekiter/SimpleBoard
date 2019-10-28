const express = require('express');
const router = express.Router();

const loginController = require('./login')
const userController = require('./user')

router.post('/session', loginController.login)
router.delete('/session', loginController.logout)

router.post('/user', userController.register)

module.exports = router