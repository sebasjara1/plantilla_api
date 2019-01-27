'use strict'

// Importación de la dependencia
const mongoose = require('mongoose');
// Método para crear esquemas
const Schema = mongoose.Schema;

// Definición del esquema
const ProductSchema = Schema({
    name: String,
    picture: String,
    price: { type: Number, default: 0 },
    category: { type: String, enum: ['computers', 'phones', 'accesories'] },
    description: String
});

// Asignar esquema al modelo y exportarlo
module.exports = mongoose.model('Product', ProductSchema);