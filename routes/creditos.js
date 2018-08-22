'use strict'
const express = require('express');
const ruta = express.Router();
const contCreditos = require('../controllers/creditos');

ruta.get('/get', contCreditos.getCreditos);
ruta.get('/get/sin_aprobar',contCreditos.getCreditosSinAprobar);
ruta.put('/aprobar_rechazar/:id',contCreditos.aprobarRechazarCredito);
ruta.post('/add',contCreditos.nuevoCredito);
module.exports = ruta;