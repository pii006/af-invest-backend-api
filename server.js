// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors middleware

// Muat variabel lingkungan dari file .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware untuk parsing JSON di body request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Konfigurasi CORS
// Ini sangat PENTING! Ganti 'https://<username>.github.io/<repository-name>/'
// dengan URL GitHub Pages frontend Anda yang sebenarnya.
const corsOptions = {
  origin: 'https://pii006.github.io/af-invest/', // Pastikan ini adalah URL GitHub Pages frontend Anda
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions));

// Koneksi ke MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Terhubung ke MongoDB Atlas'))
  .catch(err => console.error('Gagal terhubung ke MongoDB Atlas:', err));

// Impor rute-rute API
const authRoutes = require('./routes/auth');
const stockPicksRoutes = require('./routes/stockpicks'); // Pastikan path ini benar

// Gunakan rute-rute API
app.use('/api/auth', authRoutes);
app.use('/api/stockpicks', stockPicksRoutes);

// Rute dasar untuk menguji server
app.get('/', (req, res) => {
  res.send('AF Invest Backend API is running!');
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
