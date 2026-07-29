const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },

    correo: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    rol: { 
        type: String, 
        enum: ['cliente', 'admin'], 
        default: 'cliente' }
});

module.exports = mongoose.model('User', userSchema);


