'use strict'

// Librería para facilitar la implementación de tokens
const jwt = require('jwt-simple');
// Librería para facilitar el manejo de fechas
const moment = require('moment');

const config = require('../config');

// Crear un token
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

// Decodificar un token mediante una promesa
function decodeToken(token){
    // Creación de promesa
    const decoded = new Promise((resolve, reject) => {
        try {
            // Recuperar el cuarpo del token
            const payload = jwt.decode(token, config.secret_token);

            // Evaluar fecha de expiración
            if(payload.exp <= moment().unix()){
                reject({
                    status: 401,
                    message: 'El token ha expirado'
                });
            }

            // Retornar usuario registrado en el token
            resolve(payload.sub);
        } catch (err) {
            reject({
                status: 500,
                message: 'Invalid Token'
            });
        }
    });

    // Retornar promesa
    return decoded;
}

module.exports = {
    createToken,
    decodeToken
};