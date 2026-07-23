const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, enum: ['mens', 'womens', 'kids', 'general'], required: true },
    description: { type: String, default: '' },
    stock: { type: Number, default: 0 },
    tags: { type: String, default: '' },
    discount: { type: Number, default: 0, min: 0, max: 100 },
    imageUrl: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
