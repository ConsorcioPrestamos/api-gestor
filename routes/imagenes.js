var express = require('express');
var ruta = express.Router();
var imagenesCtrl = require('../controllers/imagenes');

// Para guardar momentaneamente las imagenes usaremos connect-multiparty
var multipart = require('connect-multiparty');
// Le asigamos el directorio donde estan las imagenes momentaneamente
var md_upload = multipart({ uploadDir:'./uploads' }); 

ruta.post('/add/:idpadre/:tipo',md_upload, imagenesCtrl.uploadImage);

module.exports = ruta;