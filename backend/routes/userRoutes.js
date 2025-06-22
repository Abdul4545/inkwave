const express = require('express');

const { registerUser, loginUser, userCreditBalance } = require('../controllers/userController');
const userAuthenticate = require('../middlewares/auth');

const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.get('/credit-balance', userAuthenticate , userCreditBalance);

module.exports = authRouter;