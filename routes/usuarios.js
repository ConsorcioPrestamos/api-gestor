const express = require('express');
var route = express.Router();
var usuariosCtrl = require('../controllers/usuarios');

route.put('/update/:id', usuariosCtrl.updateUsuario);
route.get('/get', usuariosCtrl.getUsuarios);
route.get('/get/:id', usuariosCtrl.getUsuario);
route.post('/login',usuariosCtrl.login);



module.exports = route;