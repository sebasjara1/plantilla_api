'use strict'
//----Importar dependencias----
// Framework para el servidor
const express = require('express');
// Complmento para trabajar con tokens
const jwt = require('jsonwebtoken');
// Complem. para convertir peticiones en JSON
const bodyParser = require('body-parser');
//Complem. para trabajar mejor con MongoDB
const mongoose = require('mongoose');

//Importación del modelo
const Product = require('./models/product');


//Inicializar express
const app = express();
// Puerto en el que se ejecuta el servidor
const port = 3000;


// Configuración básica de body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Consultar todos los registros
app.get('/api/products', (req, res) => {
    Product.find({}, (err, products) => {
        if(err) return res.status(500).send({ message: `Error en la petición: ${err}`});
        if(!products) return res.status(404).send({ message: 'El producto no existe' });

        // { product } en ES6 = { product: product }
        res.status(200).send({ products });
    });
});

// Consultar un registro
app.get('/api/products/:productId', (req, res) => {
    // Asignar variable desde parémetro de la URL
    let productId = req.params.productId;

    // Buscar registro por su ID
    Product.findById(productId, (err, product) => {
        if(err) return res.status(500).send({ message: `Error en la petición: ${err}`});
        if(!product) return res.status(404).send({ message: 'El producto no existe' });

        // { product } en ES6 = { product: product }
        res.status(200).send({ product });
    });
});

// Guardar dato en la BD
app.post('/api/products', (req, res) => {
    // Mostrar en consola el cuerpo de la petición
    console.log('POST /api/product');
    console.log(req.body);    
    
    // Instanciar un nuevo objeto del modelo
    let product =new Product();
    // Almacenar los datos del cuerpo de la petición 
    var params = req.body;

    // Asignar los datos según el modelo
    product.name = params.name;
    product.picture = params.picture;
    product.price = params.price;
    product.category = params.category;
    product.description = params.description;

    // Método para guardar en la DB
    product.save((err, productStored) => {
        // Manejo de errores del servidor
        if(err) return res.status(500).send({message: `Error al guardar el documento: ${err}`});
        if(!productStored) return res.status(404).send({message: `No se ha podido guardar el documento:`});
        // Almacenamiento correcto
        return res.status(200).send({
            product: productStored
        });
    });
});

app.put('/api/products/:productId', (req, res) => {

});

app.delete('/api/products/:productId', (req, res) => {

});

//Conexión a MongoDB mediante una promesa
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/shop', { useNewUrlParser: true })
    .then(() => {
        console.log("Conectado a la db con exito");
        //Correr el servidor si no hay error
        app.listen(port,() => {
            console.log(`Servidor en el puerto: ${port}`);
        }); 
    })
    .catch( err => console.log(`Error al conectarse a la base de datos: ${err}`));



