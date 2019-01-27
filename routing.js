'use strict'

const express = require('express');

const ProductController = require('./controllers/product');
const UserController = require('./controllers/user');

const auth = require('./middlewares/auth');

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
// Registrar usuario
router.post('/singup', UserController.signUp);
// Logear usuario
router.post('/singin', UserController.signIn);
// Prueba ruta protegida
router.get('/private', auth, (req, res) => {
    res.status(200).send({ message: 'Tienes acceso' });
});


module.exports = router;