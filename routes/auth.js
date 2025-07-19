    // routes/auth.js
    const express = require('express');
    const router = express.Router();
    const User = require('../models/User'); // Import model User
    const jwt = require('jsonwebtoken'); // Untuk membuat JWT

    // Endpoint untuk registrasi manual user (akan diinput oleh admin/Anda)
    // POST /api/auth/register-manual-user
    router.post('/register-manual-user', async (req, res) => {
        try {
            const { phoneNumber, password } = req.body;

            // Validasi sederhana input
            if (!phoneNumber || !password) {
                return res.status(400).json({ message: 'Nomor telepon dan password wajib diisi.' });
            }

            // Cek apakah user dengan nomor telepon ini sudah ada
            let user = await User.findOne({ phoneNumber });
            if (user) {
                return res.status(400).json({ message: 'Pengguna dengan nomor telepon ini sudah terdaftar.' });
            }

            // Buat user baru. Password akan di-hash secara otomatis oleh pre-save hook di model User.
            user = new User({ phoneNumber, password });
            await user.save(); // Simpan user baru ke database

            // Kirim respons sukses
            res.status(201).json({
                message: 'Pengguna berhasil didaftarkan secara manual.',
                user: { id: user._id, phoneNumber: user.phoneNumber }
            });
        } catch (error) {
            console.error('Kesalahan saat registrasi manual:', error);
            res.status(500).json({ message: 'Kesalahan server saat registrasi manual.' });
        }
    });

    // Endpoint untuk login user
    // POST /api/auth/login
    router.post('/login', async (req, res) => {
        try {
            const { phoneNumber, password } = req.body;

            // Validasi sederhana input
            if (!phoneNumber || !password) {
                return res.status(400).json({ message: 'Nomor telepon dan password wajib diisi.' });
            }

            // Cari user berdasarkan nomor telepon
            const user = await User.findOne({ phoneNumber });
            if (!user) {
                return res.status(400).json({ message: 'Kredensial tidak valid (Nomor telepon tidak ditemukan).' });
            }

            // Bandingkan password yang diinput dengan password yang di-hash di database
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Kredensial tidak valid (Password salah).' });
            }

            // Jika kredensial valid, buat JWT token
            const payload = { userId: user._id }; // Payload token berisi ID pengguna
            // Token akan kadaluarsa dalam 1 jam
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

            // Kirim respons sukses dengan token
            res.json({ message: 'Login berhasil!', token });
        } catch (error) {
            console.error('Kesalahan saat login:', error);
            res.status(500).json({ message: 'Kesalahan server saat login.' });
        }
    });

    // Ekspor router
    module.exports = router;
    