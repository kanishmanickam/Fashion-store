const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

/* ── POST /api/orders (customer places order) ── */
router.post('/', async (req, res) => {
    try {
        const { customerName, phone, email, address, city, pincode, items, total } = req.body;
        if (!customerName || !phone || !address || !city || !pincode || !items?.length) {
            return res.status(400).json({ error: 'Missing required order fields' });
        }
        const order = await Order.create({
            customerName, phone, email, address, city, pincode,
            items, total,
            paymentMethod: 'Cash on Delivery',
            status: 'Pending'
        });
        res.status(201).json({ message: 'Order placed successfully', orderId: order._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* ── GET /api/orders (admin) ── */
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* ── PATCH /api/orders/:id/status (admin update status) ── */
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!order) return res.status(404).json({ error: 'Order not found' });
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
