const mongoose = require('mongoose');

const lostItemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String }, // URL for the image of the lost item
    location: { type: String, required: true },
    status: { type: String, enum: ['lost', 'found'], default: 'lost' },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who reported the item
    resolver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // User who found the item
    contact: { type: String, required: true }, // Contact of the owner
    reportedDate: { type: Date, default: Date.now },
    resolvedDate: { type: Date }, // Date when the item was found
});

module.exports = mongoose.model('LostItem', lostItemSchema);
