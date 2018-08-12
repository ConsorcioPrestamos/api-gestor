'use strict'
const express = require('express');
var route = express.Router();
var empresasCtrl = require('../controllers/empresas');

route.get('/get',empresasCtrl.getEmpresas);
route.get('/get/:id',empresasCtrl.getEmpresa);
route.post('/add',empresasCtrl.addEmpresa);
route.put('/update/:id',empresasCtrl.updateEmpresa);

module.exports = route;