'use strict'

// Librería para facilitar la implementación de tokens
const jwt = require('jwt-simple');
// Librería para facilitar el manejo de fechas
const moment = require('moment');

const config = require('../config');


function createToken (user) {
    // Definición del Cuerpo del token
    const payload = {
        sub: user._id,
        // Fecha creación token formato unix
        iat: moment().unix(),
        // Fecha caducidad
        exp: moment().add(14, 'days').unix()
    };

    // Retorna el token codificado
    return jwt.encode(payload, config.secret_token);
}

function decodeToken(token){
    const decoded = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, config.secret_token);

            if(payload.exp <= moment().unix()){
                reject({
                    status: 401,
                    message: 'El token ha expirado'
                });
            }

            resolve(payload.sub);
        } catch (err) {
            reject({
                status: 500,
                message: 'Invalid Token'
            });
        }
    });

    return decoded;
}

module.exports = {
    createToken,
    decodeToken
};