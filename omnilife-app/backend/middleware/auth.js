const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ mensaje: 'No se envió token de acceso' });
    }

    const token = authHeader.split(' ')[1]; // formato: "Bearer <token>"

    if (!token) {
        return res.status(401).json({ mensaje: 'Formato de token inválido' });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = payload;
        next();
    } catch (error) {
        return res.status(401).json({ mensaje: 'Token inválido o expirado' });
    }
}

function esAdmin(req, res, next) {
    if (req.usuario.rol !== 'admin') {
        return res.status(403).json({ mensaje: 'No tienes permisos de administrador' });
    }
    next();
}

module.exports = { verificarToken, esAdmin };