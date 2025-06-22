const express = require('express');
const { generateImage } = require('../controllers/imageController');
const userAuthenticate = require('../middlewares/auth');

const imageRouter = express.Router();

imageRouter.post('/generate-image', userAuthenticate, generateImage);

module.exports = imageRouter;