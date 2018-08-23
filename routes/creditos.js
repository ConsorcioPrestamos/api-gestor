'use strict'
const express = require('express');
const ruta = express.Router();
const contCreditos = require('../controllers/creditos');

ruta.get('/get', contCreditos.getCreditos);
ruta.get('/get/sin_aprobar',contCreditos.getCreditosSinAprobar);
ruta.get('/get/finales',contCreditos.getFinales);
ruta.put('/preaprobar_rechazar/:id',contCreditos.preaprobarRechazarCredito);
ruta.put('/aprobar_rechazar/:id',contCreditos.AprobarRechazarCredito);
ruta.post('/add',contCreditos.nuevoCredito);
ruta.put('/editarTipo',contCreditos.editarTipo);
module.exports = ruta;