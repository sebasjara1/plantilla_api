'use strict'

const express = require('express');
const ProductController = require('./controllers/product');

const router = express.Router();

// Ruta de prueba
router.get('/home', ProductController.home);
// Consultar todos los registros
router.get('/products', ProductController.getProducts);
// Consultar un registro
router.get('/products/:productId', ProductController.getProduct);
// Guardar registro
router.post('/products', ProductController.saveProduct);
// Actualizar registro
router.put('/products/:productId', ProductController.updateProduct);
// Eliminar registro
router.delete('/products/:productId', ProductController.deleteProduct);


module.exports = router;