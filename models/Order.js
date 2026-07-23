const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: String, required: true },
    img: { type: String, default: '' },
    quantity: { type: Number, default: 1 }
}, { _id: false });

const orderSchema = new mongoose.Schema({
    customerName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, default: '', trim: true },
    address: { type: String, required: true },
    city: { type: String, required: true, trim: true },
    pincode: { type: String, required: true, trim: true },
    items: [orderItemSchema],
    total: { type: Number, required: true },
    paymentMethod: { type: String, default: 'Cash on Delivery' },
    status: { type: String, enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
