const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Product = require('../models/Product');

/* ── Multer: save uploaded images to /img/ ── */
const uploadDir = path.join(__dirname, '..', 'img');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e6);
        cb(null, unique + path.extname(file.originalname));
    }
});
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },  // 5 MB
    fileFilter: (req, file, cb) => {
        /image\/(jpeg|png|gif|webp)/.test(file.mimetype) ? cb(null, true) : cb(new Error('Only images allowed'));
    }
});

/* ── GET /api/products ── */
router.get('/', async (req, res) => {
    try {
        const filter = {};
        if (req.query.category) filter.category = req.query.category;
        const products = await Product.find(filter).sort({ createdAt: -1 });
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* ── POST /api/products ── */
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { name, price, category, description, stock, tags, discount, imageUrl } = req.body;
        const finalImage = req.file
            ? `/img/${req.file.filename}`
            : (imageUrl || '');

        const product = await Product.create({
            name, price: parseFloat(price), category,
            description, stock: parseInt(stock) || 0,
            tags, discount: parseFloat(discount) || 0,
            imageUrl: finalImage
        });
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

/* ── PUT /api/products/:id ── */
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const { name, price, category, description, stock, tags, discount, imageUrl } = req.body;
        const update = {
            name, price: parseFloat(price), category,
            description, stock: parseInt(stock) || 0,
            tags, discount: parseFloat(discount) || 0
        };
        if (req.file) update.imageUrl = `/img/${req.file.filename}`;
        else if (imageUrl) update.imageUrl = imageUrl;

        const product = await Product.findByIdAndUpdate(req.params.id, update, { new: true });
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

/* ── DELETE /api/products/:id ── */
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        // Remove uploaded image if stored locally
        if (product.imageUrl && product.imageUrl.startsWith('/img/')) {
            const filePath = path.join(__dirname, '..', product.imageUrl);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
