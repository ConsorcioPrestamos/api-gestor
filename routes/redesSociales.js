'use strict'
const express = require('express');
var route = express.Router();
var redesCtrl = require('../controllers/redesSociales');

route.get('/get', redesCtrl.getRedes);
route.get('/get/:id', redesCtrl.getRed);
route.post('/add', redesCtrl.addRed);
route.put('/update/:id', redesCtrl.updateRed);


module.exports = route;