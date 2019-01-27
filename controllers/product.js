'use strict'

const Product = require('../models/product');

const controller = {
    // Ruta de prueba
    home: function(req, res){
        return res.status(200).send({
            message: 'API de plantilla funcionando! :D'
        });
    },
    // Consultar todos los registros
    getProducts: function(req, res) {
        // Método find acepta condiciones de busqueda mediante {}. 
        Product.find({}, (err, products) => {
            if(err) return res.status(500).send({ message: `Error en la petición: ${err}`});
            if(!products) return res.status(404).send({ message: 'El producto no existe' });

            // { product } en ES6 = { product: product }
            res.status(200).send({ products });
        });
    },
    // Consultar registro
    getProduct: function(req, res){
        // Asignar variable desde parémetro de la URL
        let productId = req.params.productId;
        // Evaluar si se envió el id
        if (productId == null) return res.status(404).send({
            message: 'El proyecto no existe.'
        });

        // Buscar registro por su ID
        Product.findById(productId, (err, product) => {
            if(err) return res.status(500).send({ message: `Error en la petición: ${err}`});
            if(!product) return res.status(404).send({ message: 'El producto no existe' });

            // { product } en ES6 = { product: product }
            res.status(200).send({ product });
        });
    },
    // Guardar registro
    saveProduct: function(req, res){
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
            res.status(200).send({
                product: productStored
            });
        });
    },
    // Actualizar registro
    updateProduct: function(req, res){
        // Asignar variable desde parémetro de la URL
        let productId = req.params.productId;
        // Objeto los campos para actualizar
        let update = req.body;

        // Evaluar si se envió el id
        if (productId == null) return res.status(404).send({
            message: 'El proyecto no existe.'
        });

        // Buscar registro por su ID y actualizarlo, { new: true } permite devolver el nuevo registro
        Product.findByIdAndUpdate(productId, update, { new: true }, (err, product) => {
            if(err) return res.status(500).send({ message: `Error al actualizar: ${err}` });
            if(!product) return res.status(404).send({ message: 'No exite el producto a actualizar' });

            // { product } en ES6 = { product: product }
            res.status(200).send({ 
                message: 'El producto ha sido actualizado',
                product: product
            });
        });
    },
    // Eliminar registro
    deleteProduct: function(req, res){
        // Asignar variable desde parémetro de la URL
        let productId = req.params.productId;

        // Evaluar si se envió el id
        if (productId == null) return res.status(404).send({
            message: 'El proyecto no existe.'
        });

        // Buscar registro por su ID y removerlo
        Product.findByIdAndRemove(productId, (err, product) => {
            if(err) return res.status(500).send({ message: `Error al borrar el producto: ${err}`});
            if(!product) return res.status(404).send({ message: 'El producto no existe' });

            // { product } en ES6 = { product: product }
            res.status(200).send({ 
                message: 'El producto ha sido eliminado',
                product: product
            });
        });
    }
};

module.exports = controller;