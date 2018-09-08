'use strict'
const express = require('express');
var route = express.Router();
var asignacionCtrl = require('../controllers/asignacionLocalidad');

route.get('/get/', asignacionCtrl.getAsignaciones);
route.get('/getLocalidades/', asignacionCtrl.getLocalidades);
route.post('/asignar', asignacionCtrl.asignarLocalidades);
route.get('/getDetalles/', asignacionCtrl.getAsignacionesDetalles);
route.get('/getXCobrador/:id', asignacionCtrl.getLocalidadesXCobrador);

module.exports = route;