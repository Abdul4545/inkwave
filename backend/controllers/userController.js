const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Register a new user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
        );

        res.status(201).json({success: true, message: 'User registered successfully' , token: token, user: { id: user._id, name: user.name, email: user.email, creditBalance: user.creditBalance } });

    } catch (error) {
        console.log('Error registering user:', error);
        res.status(500).json({success: false, message: 'Internal server error'});
    }  
}


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({success: false, message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({success: false, message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
        );

        res.status(200).json({success: true, message: 'User logged in successfully', token: token, user: { id: user._id, name: user.name, email: user.email, creditBalance: user.creditBalance } });

    } catch (error) {
        console.log('Error logging in user:', error);
        res.status(500).json({success: false, message: 'Internal server error'});
    }
}


const userCreditBalance = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({success: false, message: 'User not found' });
        }
        res.status(200).json({success: true, creditBalance: user.creditBalance, user: {name: user.name}});
    } catch (error) {
        console.log('Error fetching user credit balance:', error);
        res.status(500).json({success: false, message: 'Internal server error'});
    }
}

module.exports = {
    registerUser,
    loginUser,
    userCreditBalance
};