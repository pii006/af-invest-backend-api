    // routes/stockpicks.js
    const express = require('express');
    const router = express.Router();
    const StockPick = require('../models/stockpick'); // Import model StockPick
    const authMiddleware = require('../middleware/auth'); // Import middleware autentikasi

    // Endpoint untuk mendapatkan semua stock picks (dilindungi, hanya untuk member)
    // GET /api/stockpicks
    router.get('/', authMiddleware, async (req, res) => {
        try {
            // Ambil semua data stock pick dari database
            const stockPicks = await StockPick.find();
            res.json(stockPicks); // Kirim data sebagai respons JSON
        } catch (error) {
            console.error('Kesalahan server saat mengambil stock picks:', error);
            res.status(500).json({ message: 'Kesalahan server saat mengambil stock picks.' });
        }
    });

    // Endpoint untuk menambahkan stock pick baru (dilindungi, mungkin hanya untuk admin)
    // POST /api/stockpicks
    router.post('/', authMiddleware, async (req, res) => {
        try {
            // Buat instance StockPick baru dari data di request body
            const newStockPick = new StockPick(req.body);
            await newStockPick.save(); // Simpan ke database

            res.status(201).json({
                message: 'Stock pick berhasil ditambahkan!',
                stockPick: newStockPick
            });
        } catch (error) {
            console.error('Kesalahan server saat menambahkan stock pick:', error);
            res.status(500).json({ message: 'Kesalahan server saat menambahkan stock pick.' });
        }
    });

    // Ekspor router
    module.exports = router;
    