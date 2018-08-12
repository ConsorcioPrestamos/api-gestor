'use strict'
const express = require('express');
var route = express.Router();
var clientesCtrl = require('../controllers/clientes');

route.post('/add', clientesCtrl.addCliente);
route.put('/update/:id', clientesCtrl.updateCliente);
route.get('/get', clientesCtrl.getClientes);
route.get('/get/:id', clientesCtrl.getCliente);

module.exports = route;