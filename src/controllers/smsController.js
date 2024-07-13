import Blacklist from "../models/blacklistNumber.js";

const smsController = {};

smsController.receiveSMS = async (req, res) => {
    const { From, Message } = req.body;

    if (Message.includes('STOP')) {
        try {
            const existingEntry = await Blacklist.findOne({ phoneNumber: From });
            if (existingEntry) {
                console.log(`This number is already in the blacklist: ${From}`);
                return res.status(400).json({ message: 'This number is already in the blacklist' });
            }

            await Blacklist.create({ phoneNumber: From });
            console.log(`Number added in the blacklist: ${From}`);
            return res.status(200).json({ message: 'Number added in the blacklist' });
        } catch (err) {
            console.error('Error while adding in the blacklist:', err);
            return res.status(500).json({ message: 'Error while adding in the blacklist' });
        }
    }

    console.log(`Message receive from ${From} without the word 'STOP'`);
    return res.status(200).json({ message: 'OK' });
};

smsController.getBlacklistedNumbers = async (req, res) => {
    try {
        const numbers = await Blacklist.find({});
        res.status(200).json(numbers);
    } catch (err) {
        console.error('Error retrieving blacklist number: ', err);
        res.status(500).json({ message: 'Error retrieving blacklist number' });
    }
};

smsController.checkBlacklistedNumber = async (req, res) => {
    const { phoneNumber } = req.body;

    try {
        const blacklisted = await Blacklist.findOne({ phoneNumber });
        res.status(200).json({ blacklisted: !!blacklisted });
    } catch (err) {
        console.error('Blacklist number verification error :', err);
        res.status(500).json({ message: 'Blacklist number verification error' });
    }
};

export default smsController;
