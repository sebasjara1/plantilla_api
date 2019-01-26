'use strict'
//Importar dependencias
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

//Inicializar express
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ ex}))

app.get('/', (req, res)=>{
    res.json({
        text: 'API funcionando!!'
    });
});

app.listen(port,() => {
    console.log('Servidor en el puerto: ' + port);
});


