const express = require('express');
const Product = require('../models/Product');
const { verificarToken, esAdmin } = require('../middleware/auth');

const router = express.Router();

// GET - público, cualquiera puede ver el catálogo
router.get('/', async (req, res) => {
    try {
        const productos = await Product.find();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
});

// GET por id - público
router.get('/:id', async (req, res) => {
    try {
        const producto = await Product.findById(req.params.id);
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
});

// POST - solo admin
router.post('/', verificarToken, esAdmin, async (req, res) => {
    try {
        const { nombre, precio, descripcion, imagen } = req.body;
        const nuevoProducto = new Product({ nombre, precio, descripcion, imagen });
        await nuevoProducto.save();
        res.status(201).json({ mensaje: 'Producto creado correctamente', producto: nuevoProducto });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
});

// PUT - solo admin
router.put('/:id', verificarToken, esAdmin, async (req, res) => {
    try {
        const { nombre, precio, descripcion, imagen } = req.body;
        const productoActualizado = await Product.findByIdAndUpdate(
            req.params.id,
            { nombre, precio, descripcion, imagen },
            { new: true }
        );
        if (!productoActualizado) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        res.status(200).json({ mensaje: 'Producto actualizado correctamente', producto: productoActualizado });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
});

// DELETE - solo admin
router.delete('/:id', verificarToken, esAdmin, async (req, res) => {
    try {
        const productoEliminado = await Product.findByIdAndDelete(req.params.id);
        if (!productoEliminado) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        res.status(200).json({ mensaje: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
});

module.exports = router;