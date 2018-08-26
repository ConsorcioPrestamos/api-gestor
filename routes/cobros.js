var express = require('express');
var ruta = express.Router();
var contCobros= require('../controllers/cobros');

ruta.get('/get',contCobros.getCobros);
ruta.get('/get_xcliente/:id',contCobros.getCobrosPorCliente);
ruta.get('/get_xrealizar',contCobros.getCobrosXRealizar);
ruta.get('/get_atrasados',contCobros.getCobrosAtrasados);
ruta.get('/get_xrealizar_diarios',contCobros.cobrosXRealizarDia);
ruta.get('/getDetalles', contCobros.cobrosDetalles);
ruta.put('/pago_requerido',contCobros.pagoRequerido);
ruta.put('/pago_completo',contCobros.pagoCompleto);
ruta.put('/pago_exacto',contCobros.pagoExacto);




module.exports = ruta;
