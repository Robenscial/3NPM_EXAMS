import mongoose from 'mongoose';

const BlacklistSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        unique: true
    },
    addedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Blacklist = mongoose.model('Blacklist', BlacklistSchema);

export default Blacklist;
