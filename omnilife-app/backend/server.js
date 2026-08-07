require('dotenv').config();

const express = require('express');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');

const app = express();

connectDB();

app.use(cors({
    origin: [
    'http://localhost:4200',
    'http://3.19.209.49'
]
}));
app.use(express.json());
app.use('/api/usuarios', userRoutes);
app.use('/api/productos', productRoutes);

app.get('/', (req, res) => {
    res.send('Hola desde mi backend');
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
});