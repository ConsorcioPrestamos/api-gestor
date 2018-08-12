'use strict'
const express = require('express');
var route = express.Router();
var sucursalCtrl = require ('../controllers/sucursales');

route.get('/get', sucursalCtrl.getSucursales);
route.get('/get/:id', sucursalCtrl.getSucursal);
route.post('/add', sucursalCtrl.addSucursal);
route.put('/update/:id', sucursalCtrl.updateSucursal);
route.put('/setEncargado/:id', sucursalCtrl.setEncargado);
route.get('/getDetalles', sucursalCtrl.getDetalles);

module.exports = route;