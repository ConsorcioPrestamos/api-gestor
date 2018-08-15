'use strict'
const express = require('express');
var route = express.Router();
var investigacionesCtrl = require('../controllers/investigaciones');

route.post('/update/:id',investigacionesCtrl.updateInvestigacion);
route.get('/get', investigacionesCtrl.getInvestgaciones);
route.get('/getPendientes', investigacionesCtrl.getInvestgacionesPendientes);

module.exports = route;