const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel.js');

const userAuthenticate = async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized! Login again' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (decodedToken.userId) {
            req.user = { id: decodedToken.userId }; 
            next();
        } else {
            return res.status(401).json({ success: false, message: 'Invalid token structure' });
        }

    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
};



module.exports = userAuthenticate;