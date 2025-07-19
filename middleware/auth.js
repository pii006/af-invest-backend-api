    // middleware/auth.js
    const jwt = require('jsonwebtoken'); // Library untuk JSON Web Token

    // Middleware autentikasi
    const authMiddleware = (req, res, next) => {
        // Dapatkan token dari header 'Authorization'
        // Format header biasanya "Bearer <token>"
        const authHeader = req.header('Authorization');

        // Cek jika tidak ada header Authorization atau formatnya salah
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Tidak ada token, otorisasi ditolak' });
        }

        // Ambil token string setelah "Bearer "
        const token = authHeader.split(' ')[1];

        try {
            // Verifikasi token menggunakan JWT_SECRET dari .env
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Tambahkan userId dari payload token ke objek request
            // Ini akan memungkinkan kita mengakses userId di rute yang dilindungi
            req.userId = decoded.userId;
            next(); // Lanjutkan ke rute berikutnya
        } catch (error) {
            console.error('Kesalahan verifikasi token:', error);
            res.status(401).json({ message: 'Token tidak valid' }); // Token tidak valid atau kadaluarsa
        }
    };

    // Ekspor middleware
    module.exports = authMiddleware;
    