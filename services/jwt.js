'use strict'
var jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');
const secret = config.secret

function createTokenLogin(data){
    var payload = {
        sub:data.idusuario,
        id_usuario:data.idusuario,
        id_empleado:data.idempleado,
        id_sucursal:data.id_sucursal,
        nombre:data.nombres,
        app_pat:data.app_pat,
        app_mat:data.app_mat,
        telefonos:data.telefonos,
        puesto:data.puesto,
        derecho_esp:data.derecho_esp,
        status:data.status,
        sucursal_nombre:data.sucursal_nombre,
        iat: moment().unix(), //fecha de creacion
        exp:moment().add(30,'days').unix() //fecha de expriracion
    }

    return jwt.encode(payload,secret);
}

module.exports = {
    createTokenLogin
}