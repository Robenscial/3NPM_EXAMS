import {body, validationResult} from 'express-validator';

const validateSMS = [
    body('From').notEmpty().withMessage('From is required'),
    body('Message').notEmpty().withMessage('Message is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateCheckBlacklisted = [
    body('phoneNumber').notEmpty().withMessage('phoneNumber is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export {validateCheckBlacklisted, validateSMS};
