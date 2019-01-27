'use strict'
//----Importar dependencias----
// Framework para el servidor
const express = require('express');
// Complmento para trabajar con tokens
const jwt = require('jsonwebtoken');
// Complem. para convertir peticiones en JSON
const bodyParser = require('body-parser');

//Inicializar express
const app = express();
// Puerto en el que se ejecuta el servidor
const port = 3000;


//Configuración básica de body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/api/products', (req, res) => {
    res.status(200).send(
        { products: [] }
    );
});

app.get('/api/products/:productId', (req, res) => {

});

app.post('/api/products', (req, res) => {
    console.log(req.body);
    res.status(200).send(
        { message: 'Producto recibido' }
    );
});

app.put('/api/products/:productId', (req, res) => {

});

app.delete('/api/products/:productId', (req, res) => {

});


//Correr servidor
app.listen(port,() => {
    console.log(`Servidor en el puerto: ${port}`);
});


