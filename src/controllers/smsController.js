import Blacklist from "../models/blacklistNumber.js";

const smsController = {};

smsController.receiveSMS = async (req, res) => {
    const { From, Message } = req.body;

    if (Message.includes('STOP')) {
        try {
            const existingEntry = await Blacklist.findOne({ phoneNumber: From });
            if (existingEntry) {
                console.log(`Numéro déjà dans la blacklist: ${From}`);
                return res.status(400).json({ message: 'Le numéro est déjà dans la blacklist' });
            }

            await Blacklist.create({ phoneNumber: From });
            console.log(`Numéro ajouté à la blacklist: ${From}`);
            return res.status(200).json({ message: 'Numéro ajouté à la blacklist' });
        } catch (err) {
            console.error('Erreur lors de l\'ajout à la blacklist :', err);
            return res.status(500).json({ message: 'Erreur lors de l\'ajout à la blacklist' });
        }
    }

    console.log(`Message reçu de ${From} sans le mot 'STOP'`);
    return res.status(200).json({ message: 'OK' });
};

smsController.getBlacklistedNumbers = async (req, res) => {
    try {
        const numbers = await Blacklist.find({});
        res.status(200).json(numbers);
    } catch (err) {
        console.error('Erreur lors de la récupération des numéros blacklistés: ', err);
        res.status(500).json({ message: 'Erreur lors de la récupération des numéros blacklistés' });
    }
};

smsController.checkBlacklistedNumber = async (req, res) => {
    const { phoneNumber } = req.body;

    try {
        const blacklisted = await Blacklist.findOne({ phoneNumber });
        res.status(200).json({ blacklisted: !!blacklisted });
    } catch (err) {
        console.error('Erreur lors de la vérification du numéro blacklisté :', err);
        res.status(500).json({ message: 'Erreur lors de la vérification du numéro blacklisté' });
    }
};

export default smsController;
