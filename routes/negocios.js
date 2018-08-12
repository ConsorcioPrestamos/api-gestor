'use strict'
const express = require('express');
var route = express.Router();
var negociosCtrl = require('../controllers/negocios');

route.post('/add', negociosCtrl.addNegocio);
route.put('/update/:id', negociosCtrl.updateNegocio);
route.get('/get', negociosCtrl.getNegocios);
route.get('/get/:id', negociosCtrl.getNegocio);
route.get('/getDetalles', negociosCtrl.getDetalles);

module.exports=route;