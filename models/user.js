'use strict'

// Importación de la dependencia
const mongoose = require('mongoose');
// Dependencia para encriptar contraseñas
const bcrypt = require('bcrypt-nodejs');
// Método para crear esquemas
const Schema = mongoose.Schema;

// Definición del esquema
const UserSchema = Schema({
    email: { type: String, unique: true, lowercase: true },
    displayName: String,
    avatar: String,
    password: { type: String, select: true },
    signupDate: { type: Date, default: Date.now() },
    lastLogin: Date
});

// Método del modelo para realizar una acción antes de un evento, en este caso guardar. 
UserSchema.pre('save', function(next) {

    if(!this.isModified('password')) return next();
    
    //Encriptar contraseña antes de enviar a la DB 
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(this.password, salt, null, (err, hash) => {
            if (err) return next(err);

            this.password = hash;
            next();
        });
    });
});

// Método agregado al esquema para comparar contraseñas
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        cb(err, isMatch);
    });
}

// Asignar esquema al modelo y exportarlo
module.exports = mongoose.model('User', UserSchema);