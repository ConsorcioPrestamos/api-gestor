'use strict'
const express = require('express');
var route = express.Router();
var zonasCtrl = require ('../controllers/zonas');

route.get('/get', zonasCtrl.getZonas);
route.get('/get/:id', zonasCtrl.getZona);
route.post('/add', zonasCtrl.addZona);
route.put('/update/:id', zonasCtrl.updateZona);
route.put('/setEncargado/:id',zonasCtrl.setEmpleado);
route.get('/getDetalles/',zonasCtrl.getDetalles);

module.exports = route;