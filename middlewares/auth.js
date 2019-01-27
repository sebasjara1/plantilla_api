'use strict'

const _service = require('../services/tokenServices');

// Verificar token
function isAuth (req, res, next) {
    // Validar si en la cabecera se envió un token
    if(!req.headers.authorization) {
        return res.status(403).send({ message: 'No tienes autorización' });
    }

    // Convierte el contenido de la cabecera en un array según sus espacios y toma el indice con el token.
    const token = req.headers.authorization.split(' ')[1];
    // Decodifica el token
    _service.decodeToken(token)
            .then(response => {
                req.user = response;
                next();
            })
            .catch(response => {
                res.status(response.status);
            });
}

module.exports = isAuth;