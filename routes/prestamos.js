'use strict'
const express = require('express');
const ruta = express.Router();
const contPrestamos = require('../controllers/prestamos');

ruta.get('/get', contPrestamos.getPrestamos);
ruta.get('/get/sin_aprobar',contPrestamos.getPrestamosSinAprobar);
ruta.put('/aprobar_rechazar/:id',contPrestamos.aprobarRechazarPrestamo);
ruta.post('/add',contPrestamos.nuevoPrestamo);
module.exports = ruta;