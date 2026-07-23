const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

const app = express();
const PORT = 3000;
const MONGO_URI = 'mongodb://localhost:27017/luxefashion';

/* ── Middleware ── */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ── Serve static HTML/CSS/JS/images ── */
app.use(express.static(path.join(__dirname)));

/* ── API Routes ── */
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

/* ── 404 fallback ── */
app.use((req, res) => {
    if (req.path.startsWith('/api')) {
        return res.status(404).json({ error: 'API route not found' });
    }
    res.sendFile(path.join(__dirname, 'index.html'));
});

/* ── Connect to MongoDB then start server ── */
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅  MongoDB connected →', MONGO_URI);
        app.listen(PORT, () => {
            console.log(`🚀  LuxeFashion server running at http://localhost:${PORT}`);
            console.log('   Open: http://localhost:3000/login.html');
        });
    })
    .catch(err => {
        console.error('❌  MongoDB connection failed:', err.message);
        process.exit(1);
    });
