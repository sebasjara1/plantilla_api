'use strict'

// Complem. para trabajar con MongoDB
const mongoose = require('mongoose');
// Puerto en el que se ejecuta el servidor
const config = require('./config');

const app = require('./app');

//Conexión a MongoDB mediante una promesa
mongoose.Promise = global.Promise;
mongoose.connect(config.db, { useNewUrlParser: true })
    .then(() => {
        console.log("Conectado a la db con exito");
        //Correr el servidor si no hay error
        app.listen(config.port,() => {
            console.log(`Servidor en el puerto: ${config.port}`);
        }); 
    })
    .catch( err => console.log(`Error al conectarse a la base de datos: ${err}`));



