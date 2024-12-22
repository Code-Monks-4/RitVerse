const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'mentor'], required: true },
    isVerified: { type: Boolean, default: false },
    bio: { type: String },
    contact: { type: String },
    services: { // For mentors
        type: [
            {
                description: String,
                price: Number, // Free if 0
            },
        ],
        required: function () { return this.role === 'mentor'; },
    },
    sessionHistory: { // History of sessions (mentored or attended)
        type: [
            {
                sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
                topic: String,
                role: { type: String, enum: ['mentor', 'student'] },
                date: Date,
                status: { type: String, enum: ['completed', 'pending', 'cancelled'], default: 'pending' },
            },
        ],
        default: [],
    },
    productHistory: { // Products sold or bought
        sold: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
                title: String,
                price: Number,
                buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                soldDate: Date,
            },
        ],
        bought: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
                title: String,
                price: Number,
                seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                purchaseDate: Date,
            },
        ],
    },
    lostAndFoundHistory: { // Items reported as lost or found
        lost: [
            {
                lostItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'LostItem' },
                title: String,
                status: { type: String, enum: ['lost', 'found'] },
                reportedDate: Date,
                resolvedDate: Date,
            },
        ],
        found: [
            {
                lostItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'LostItem' },
                title: String,
                description: String,
                location: String,
                reportedDate: Date,
            },
        ],
    },
    tokens: [{ token: { type: String, required: true } }],
});

module.exports = mongoose.model('User', userSchema);