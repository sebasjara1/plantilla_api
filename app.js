'use strict'

// Framework para el servidor
const express = require('express');
// Complem. para convertir peticiones en JSON
const bodyParser = require('body-parser');

//Inicializar express
const app = express();

/*---------------------IMPORTAR RUTAS---------------------*/
const product_routes = require('./routing');

/*---------------------MIDDLEWARES------------------------*/
// Configuración básica de body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Configurar CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

/*---------------------CARGAR RUTAS---------------------*/
app.use('/api', product_routes);

// Exportar archivo
module.exports = app;