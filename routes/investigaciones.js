'use strict'
const express = require('express');
var route = express.Router();
var investigacionesCtrl = require('../controllers/investigaciones');

route.put('/update/:id',investigacionesCtrl.updateInvestigacion);
route.get('/get', investigacionesCtrl.getInvestgaciones);
route.get('/getPendientes', investigacionesCtrl.getInvestgacionesPendientes);

module.exports = route;