const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String }, // URL for the product image
    category: { type: String, required: true }, // e.g., hostel essentials, tools, etc.
    condition: { type: String, enum: ['new', 'used'], required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the seller
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the buyer
    isSold: { type: Boolean, default: false },
    listedDate: { type: Date, default: Date.now }, // Date when the product was listed
    soldDate: { type: Date }, // Date when the product was sold
});

module.exports = mongoose.model('Product', productSchema);
