const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Mentor's user reference
    topic: { type: String, required: true }, // Topic of the session
    schedule: { type: Date, required: true }, // Scheduled date and time of the session
    price: { type: Number, required: true }, // Session fee (0 for free)
    paymentStatus: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
    meetingLink: { type: String }, // Online meeting link
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Students who join the session
    createdDate: { type: Date, default: Date.now }, // Date when the session was created
    completionDate: { type: Date }, // Date when the session was completed
});

module.exports = mongoose.model('Session', sessionSchema);
