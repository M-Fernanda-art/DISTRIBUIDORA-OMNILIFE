const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/registro', async (req, res) => {
    try {
        const { nombre, correo, password } = req.body;
        const usuarioExiste = await User.findOne({ correo });
        if (usuarioExiste) {
            return res.status(400).json({
                mensaje: 'El correo ya está registrado'
            });
        }

        const passwordEncriptado = await bcrypt.hash(password, 10);
        const nuevoUsuario = new User({
            nombre,
            correo,
            password: passwordEncriptado
        });

        await nuevoUsuario.save();
        res.status(201).json({
            mensaje: 'Usuario registrado correctamente'
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error del servidor'
        });
    }
});




router.post('/login', async (req, res) => {
    try {
        const { correo, password } = req.body;
        const usuario = await User.findOne({ correo });
        if (!usuario) {
            return res.status(401).json({ mensaje: "Correo o contraseña incorrectos" });
        }
        const passwordCorrecto = await bcrypt.compare(
            password,
            usuario.password
        );

        if (!passwordCorrecto) {
            return res.status(401).json({
                mensaje: 'Constraseña incorrecta'
            });
        }

        const token = jwt.sign(
            { id: usuario._id, correo: usuario.correo, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.status(200).json({
            mensaje: 'Login exitoso',
            token: token,
            usuario: {
                nombre: usuario.nombre,
                correo: usuario.correo,
                rol: usuario.rol
            }
        });

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error del servidor'
        });
    }
});

module.exports = router;


