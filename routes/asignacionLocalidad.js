'use strict'
const express = require('express');
var route = express.Router();
var asignacionCtrl = require('../controllers/asignacionLocalidad');

route.get('/get/', asignacionCtrl.getAsignaciones);

module.exports = route;