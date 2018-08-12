'use strict'
const express = require('express');
var route = express.Router();
var tiposCreditoCtrl = require ('../controllers/tiposCredito');

route.get('/get', tiposCreditoCtrl.getTiposCreditos);
route.get('/get:/id', tiposCreditoCtrl.getTipoCredito);
route.post('/add', tiposCreditoCtrl.addTipoCredito);
route.put('/update/:id', tiposCreditoCtrl.updateTipoCredito);
route.get('/getDetalles/', tiposCreditoCtrl.getDetalles);

module.exports = route;