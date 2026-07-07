const express = require('express');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');

const app = express();

connectDB();

app.use(express.json());
app.use('/api/usuarios', userRoutes);

app.get('/', (req, res) => {
    res.send('Hola desde mi backend');
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
});