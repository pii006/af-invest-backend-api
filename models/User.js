  // models/User.js
    const mongoose = require('mongoose');
    const bcrypt = require('bcryptjs'); // Library untuk hashing password

    // Definisikan schema untuk model User
    const userSchema = new mongoose.Schema({
        phoneNumber: {
            type: String,
            required: true, // Wajib diisi
            unique: true    // Setiap nomor telepon harus unik
        },
        password: {
            type: String,
            required: true  // Wajib diisi
        }
    });

    // Middleware Mongoose: Hash password sebelum menyimpan user ke database
    userSchema.pre('save', async function(next) {
        // Hanya hash password jika password dimodifikasi (misal: saat register atau ganti password)
        if (this.isModified('password')) {
            // Hash password dengan salt round 10 (standar keamanan yang baik)
            this.password = await bcrypt.hash(this.password, 10);
        }
        next(); // Lanjutkan ke operasi penyimpanan
    });

    // Metode kustom untuk membandingkan password saat login
    userSchema.methods.comparePassword = async function(candidatePassword) {
        // Bandingkan password yang diinput dengan password yang sudah di-hash di database
        return bcrypt.compare(candidatePassword, this.password);
    };

    // Ekspor model User
    module.exports = mongoose.model('User', userSchema);