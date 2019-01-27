'use strict'

const mongoose = require('mongoose');

const User = require('../models/user');
const _service = require('../services/tokenServices');

const controller = {
    // Registrar usuario en la DB
    signUp: function(req, res){
         // Instanciar un nuevo objeto del modelo
         let user = new User();
         // Almacenar los datos del cuerpo de la petición 
         var params = req.body;
 
         // Asignar los datos según el modelo
         user.email = params.email;
         user.displayName = params.displayName;
         user.password = params.password;

         // Método para guardar en la DB
         user.save((err, userStored) => {
             // Manejo de errores del servidor
             if(err) return res.status(500).send({message: `Error al guardar el documento: ${err}`});
             if(!userStored) return res.status(404).send({message: `No se ha podido guardar el documento:`});
             // Almacenamiento correcto, creación del token mediante un servicio
             res.status(200).send({
                 message: 'Usuario guardado',
                 token: _service.createToken(user)
             });
         });
    },

    signIn: function(req, res){

        var email = req.body.email;

        if (email == null) return res.status(404).send({
            message: 'El email no existe.'
        });

        User.findOne({ email }, (err, user) => {
            if(err) return res.status(500).send({
                message: `Error al devolver los datos: ${err}`
            });

            if(!user) return res.status(404).send({
                message: 'El usuario no existe.'
            });

            return user.comparePassword(req.body.password, (err, isMatch) => {
                if(err) return res.status(500).send({
                    message: `Error al devolver los datos2: ${err}`
                });
                if (!isMatch) return res.status(404).send({ message: `Error de contraseña: ${req.body.email}` });

                req.User = user;
                return res.status(200).send({
                    message: 'Login correcto',
                    token: _service.createToken(user)
                });
            });
            
        });
    }
};

module.exports = controller;