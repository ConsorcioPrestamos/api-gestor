'use strict'
const express = require('express');
var route = express.Router();
var empleadosCtrl = require('../controllers/empleados');

route.get('/get',empleadosCtrl.getEmpleados);
route.get('/get/:id',empleadosCtrl.getEmpleado);
route.post('/add',empleadosCtrl.addEmpleado);
route.put('/update/:id',empleadosCtrl.updateEmpleado);
route.get('/getDetalles',empleadosCtrl.getEmpleadosDetalles);
route.get('/getCobradores', empleadosCtrl.getCobradores);

module.exports = route;