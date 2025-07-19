 // server.js
    const express = require('express');
    const mongoose = require('mongoose');
    const dotenv = require('dotenv'); // Untuk membaca .env file

    // Muat variabel lingkungan dari .env file
    dotenv.config();

    const app = express();
    const PORT = process.env.PORT || 3000;

    // Middleware: Untuk parsing JSON body dari request dan URL-encoded data
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Koneksi ke MongoDB
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Terhubung ke MongoDB')) // Pesan sukses koneksi
    .catch(err => console.error('Kesalahan koneksi MongoDB:', err)); // Pesan error koneksi

    // Import Routes (akan kita buat di langkah selanjutnya)
    const authRoutes = require('./routes/auth');
    const stockPickRoutes = require('./routes/stockpicks');

    // Gunakan Routes
    app.use('/api/auth', authRoutes); // Rute untuk autentikasi (login/register)
    app.use('/api/stockpicks', stockPickRoutes); // Rute untuk rekomendasi saham

    // Rute dasar untuk menguji server
    app.get('/', (req, res) => {
        res.send('Selamat datang di Backend AF Invest!');
    });

    // Mulai server
    app.listen(PORT, () => {
        console.log(`Server berjalan di port ${PORT}`);
    });