    // models/StockPick.js
    const mongoose = require('mongoose');

    // Definisikan schema untuk model StockPick
    const stockPickSchema = new mongoose.Schema({
        ticker: {
            type: String,
            required: true // Kode saham wajib diisi
        },
        entryPrice: {
            type: Number,
            required: true // Harga masuk wajib diisi
        },
        targetPrice: {
            type: Number // Harga target (opsional)
        },
        stopLoss: {
            type: Number // Batas kerugian (opsional)
        },
        analysis: {
            type: String // Analisis atau alasan rekomendasi
        },
        recommendationDate: {
            type: Date,
            default: Date.now // Tanggal rekomendasi, defaultnya tanggal saat ini
        },
        status: {
            type: String,
            enum: ['Active', 'TP Achieved', 'SL Hit', 'Cancelled'], // Status rekomendasi
            default: 'Active' // Default status adalah 'Active'
        }
    });

    // Ekspor model StockPick
    module.exports = mongoose.model('StockPick', stockPickSchema);
    