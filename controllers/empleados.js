var config = require('../config');
var pool = config.pool;
var moment = require('moment');

function addEmpleado(req,res){
    var data = req.body;
    console.log(data);
    if(!data.idsucursal || !data.nombres || !data.app_pat || !data.app_mat || !data.callenum || !data.colonia || !data.estado || !data.municipio || !data.poblacion || !data.telefonos || !data.nss || !data.puesto || !data.derecho_esp  || !data.usuario || !data.password) return res.status(500).send({message:`Error , faltaron datos`});
    pool.getConnection((err,connection)=>{
        if(!err){
            var fecha_alta = moment().format('YYYY-MM-DD');
            var sql=`INSERT INTO empleados VALUES(null, ${data.idsucursal}, '${fecha_alta}','${data.nombres.toUpperCase()}', '${data.app_pat.toUpperCase()}','${data.app_mat.toUpperCase()}','${data.callenum.toUpperCase()}', '${data.colonia.toUpperCase()}', '${data.estado.toUpperCase()}', '${data.municipio.toUpperCase()}', '${data.poblacion.toUpperCase()}', '${data.telefonos}', '${data.nss}', '${data.puesto.toUpperCase()}', '${data.derecho_esp.toUpperCase()}', 'ACTIVO')`;
            connection.query(sql,(err,result)=>{
                if(!err){
                    var idempresa= result.insertId;
                    sql = `INSERT INTO usuarios VALUES(null,${idempresa},'${data.usuario}','${data.password}')`;
                    connection.query(sql,(err,result)=>{
                        if(!err){
                            res.status(200).send({result});
                        }else  res.status(500).send({message:`Error en la insercion en la bd: ${err}`});        
                    })
                }else res.status(500).send({message:`Error en la consulta en la bd: ${err}`});
            })
        }else res.status(500).send({message:`Error en la conexion a la bd: ${err}`});
        connection.release();
    });
}

function updateEmpleado(req,res){
    var data = req.body;
    var idempleado = req.params.id;
    if(!data.idsucursal || !data.nombres || !data.app_pat || !data.app_mat || !data.callenum || !data.colonia || !data.estado || !data.municipio || !data.poblacion || !data.telefonos || !data.nss || !data.puesto || !data.derecho_esp || !data.status) return res.status(500).send({message:`Error , faltaron datos`});
    pool.getConnection((err,connection)=>{
        if(!err){
            var fecha_alta = moment().format('YYYY-MM-DD');
            var sql=`UPDATE empleados SET idsucursal=${data.idsucursal}, nombres='${data.nombres.toUpperCase()}', app_pat='${data.app_pat.toUpperCase()}', app_mat='${data.app_mat.toUpperCase()}', callenum='${data.callenum.toUpperCase()}', colonia='${data.colonia.toUpperCase()}', estado='${data.estado.toUpperCase()}', municipio='${data.municipio.toUpperCase()}', poblacion='${data.poblacion.toUpperCase()}', telefonos='${data.telefonos}', nss='${data.nss}', puesto='${data.puesto.toUpperCase()}', derecho_esp='${data.derecho_esp.toUpperCase()}', status='${data.status.toUpperCase()}' WHERE idempleado=${idempleado}`;
            connection.query(sql,(err,result)=>{
                if(!err){
                    res.status(200).send({result});
                }else res.status(500).send({message:`Error en la insercion a la bd: ${err}`});        
            })
        }else res.status(500).send({message:`Error en la conexion a la bd: ${err}`});
        connection.release();
    });
}

function getEmpleados(req,res){
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql=`SELECT * FROM empleados`;
            connection.query(sql,(err,result)=>{
                if(!err){
                    res.status(200).send({result});
                }else res.status(500).send({message:`Error en la consulta en la bd: ${err}`});
            });
        }else res.status(500).send({message:`Error en la conexion a la bd: ${err}`});
        connection.release();
    });
}

function getEmpleado(req,res){
    var idempleado=req.params.id;
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql=`SELECT * FROM empleados WHERE idempleado = ${idempleado}`;
            connection.query(sql,(err,result)=>{
                if(!err){
                    res.status(200).send({result});
                }else res.status(500).send({message:`Error en la consulta en la bd: ${err}`});
            });
        }else res.status(500).send({message:`Error en la conexion a la bd: ${err}`});
        connection.release();
    });
}

function getEmpleadosDetalles(req,res){
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql=`
                SELECT
                empleados.idempleado,
                empleados.idsucursal,
                empleados.fecha_alta,
                empleados.nombres,
                empleados.app_pat,
                empleados.app_mat,
                empleados.callenum,
                empleados.colonia,
                empleados.estado,
                empleados.municipio,
                empleados.poblacion,
                empleados.telefonos,
                empleados.nss,
                empleados.puesto,
                empleados.derecho_esp,
                empleados.status,
                sucursales.nombre as sucursal_nombre
                from 
                empleados 
                INNER JOIN sucursales on sucursales.idsucursal = empleados.idsucursal
            `;
            connection.query(sql,(err,result)=>{
                if(!err){
                    res.status(200).send({result});
                }else res.status(500).send({message:`Error en la bd: ${err}`});        
            })
        }else res.status(500).send({message:`Error en la conexion a la bd: ${err}`});
        connection.release();
    });
}


module.exports = {
    getEmpleados,
    getEmpleado,
    addEmpleado,
    updateEmpleado,
    getEmpleadosDetalles
}