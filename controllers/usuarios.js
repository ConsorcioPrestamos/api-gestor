'use strict'
const config = require('../config');
var pool = config.pool;

function updateUsuario(req,res){
    var data = req.body;
    var idusuario = req.params.id;
    if(!data.usuario || !data.password) return res.status(500).send({message:`Error, faltaron mandar datos`});
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql=`UPDATE usuarios set usuario='${data.usuario}', password='${data.password}' WHERE idusuario=${idusuario}`;
            connection.query(sql,(err,result)=>{
                if(!err){
                    res.status(200).send({result});
                }else res.status(500).send({message:`Error en el updat en la bd: ${err}`});
            });
        }else res.status(500).send({message:`Error en la conexion a la bd: ${err}`});
        connection.release();
    });
}

function getUsuarios(req,res){
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql=`SELECT * FROM usuarios`;
            connection.query(sql,(err,result)=>{
                if(!err){
                    res.status(200).send({result});
                }else res.status(500).send({message:`Error en el updat en la bd: ${err}`});
            });
        }else res.status(500).send({message:`Error en la conexion a la bd: ${err}`});
        connection.release();
    });
}

function getUsuario(req,res){
    var idusuario = req.params.id;
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql=`SELECT * FROM usuarios WHERE idusuario=${idusuario}`;
            connection.query(sql,(err,result)=>{
                if(!err){
                    res.status(200).send({result});
                }else res.status(500).send({message:`Error en el updat en la bd: ${err}`});
            });
        }else res.status(500).send({message:`Error en la conexion a la bd: ${err}`});
        connection.release();
    });
}

function login(req,res){
    var data = req.body;
    if(!data.usuario || !data.password) return res.status(500).send({message:`Error, no se enviaron todos los campos`});
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql=`
                SELECT 
                usuarios.idusuario,
                usuarios.idempleado,
                usuarios.usuario,
                usuarios.password,
                empleados.idsucursal,
                empleados.nombres,
                empleados.app_pat,
                empleados.app_mat,
                empleados.telefonos,
                empleados.puesto,
                empleados.derecho_esp,
                empleados.status,
                sucursales.nombre as sucursal_nombre
                from usuarios 
                INNER JOIN empleados on empleados.idempleado = usuarios.idempleado
                LEFT JOIN sucursales on empleados.idempleado = sucursales.idsucursal
                WHERE usuario = '${data.usuario}' AND password = '${data.password}';
            `;
            connection.query(sql,(err,result)=>{
                if(!err){
                    res.status(200).send({result});
                }else res.status(500).send({message:`Error en la consulta a la bd: ${err}`});        
            })
        }else res.status(500).send({message:`Error en la conexion a la bd: ${err}`});
        connection.release();
    });
}
module.exports={
    updateUsuario,
    getUsuarios,
    getUsuario,
    login
}