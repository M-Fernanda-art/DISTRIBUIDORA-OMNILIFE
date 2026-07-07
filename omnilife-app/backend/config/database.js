const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/omnilife');

        console.log('Conectado a MongoDB');
    } catch (error) {
        console.error('Error al conectar con MongoDB');
        console.error(error);

        process.exit(1);
    }
};

module.exports = connectDB;