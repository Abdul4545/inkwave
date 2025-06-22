const FormData = require('form-data');
const UserModel = require('../models/userModel.js');
const axios = require('axios');

const generateImage = async (req, res) => {
    try {
        const {prompt} = req.body;
        const userId = req.user.id;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if(!prompt || prompt.trim() === '') {
            return res.status(400).json({ success: false, message: 'Prompt is required' });
        }

        if (user.creditBalance === 0) {
            return res.status(403).json({ success: false, message: "You have 0 credits", "redirectToBuy": true, creditBalance: user.creditBalance });
        }

        const formData = new FormData();
        formData.append('prompt', prompt);

        const response = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
            headers: {
                'x-Api-Key': process.env.API_KEY,
            },
            responseType: 'arraybuffer',
        })

        if (response.status !== 200) {
            return res.status(500).json({ success: false, message: 'Failed to generate image' });
        }
        const base64Image = Buffer.from(response.data, 'binary').toString('base64');

        const imageUrl = `data:image/png;base64,${base64Image}`;

        await UserModel.findByIdAndUpdate(user._id, {creditBalance: user.creditBalance - 1}, {new: true});

        res.status(200).json({ success: true, imageUrl: imageUrl, creditBalance: user.creditBalance});
    }

    catch (error) {
        console.log('Error generating image:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

module.exports = {
    generateImage
};



