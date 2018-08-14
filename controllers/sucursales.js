'use strict'
const config = require('../config');
var pool = config.pool;


function addSucursal(req,res){
    var data =  req.body;
    if(!data.nombre || !data.telefono || !data.hora_inicio || !data.hora_fin || !data.callenum || !data.colonia || !data.poblacion || !data.municipio || !data.estado || !data.cp || !data.nombre_red.toUpperCase() || !data.url) return res.status(500).send({message:`Error, no se enviaron todos los datos`});
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `INSERT INTO sucursales VALUES(null,null,'${data.nombre.toUpperCase()}','${data.telefono.toUpperCase()}','${data.hora_inicio.toUpperCase()}','${data.hora_fin.toUpperCase()}','${data.callenum.toUpperCase()}','${data.colonia.toUpperCase()}','${data.poblacion.toUpperCase()}','${data.municipio.toUpperCase()}','${data.estado.toUpperCase()}','${data.cp}')`;
            connection.query(sql,(err,result)=>{
                if(!err){
                    var idsucursal = result.insertId;
                    sql = `INSERT INTO redes_sociales VALUES(null, '${idsucursal}','${data.nombre_red.toUpperCase()}', '${data.url}')`;
                    connection.query(sql,(err,result)=>{
                        if(!err){
                            res.status(200).send({result});
                        }else res.status(500).send({message: `Error al insertar en la BD: ${err}`})
                    })
                }else res.status(500).send({message:`Error al insertar en la base de datos: ${err}`});
            });
        }else res.status(500).send({message:`Error al conectar con la base de datos: ${err}`});
        connection.release();
    })
}

function updateSucursal(req,res){
    var data =  req.body;
    var idsucursal = req.params.id;
    if(!data.nombre || !data.telefono || !data.hora_inicio || !data.hora_fin || !data.callenum || !data.colonia || !data.poblacion || !data.municipio || !data.estado || !data.cp)  return res.status(500).send({message:`Error, no se enviaron todos los datos`});
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `UPDATE sucursales SET nombre='${data.nombre.toUpperCase()}', telefono='${data.telefono.toUpperCase()}', hora_inicio='${data.hora_inicio.toUpperCase()}', hora_fin='${data.hora_fin.toUpperCase()}', callenum='${data.callenum.toUpperCase()}', colonia='${data.colonia.toUpperCase()}', poblacion='${data.poblacion.toUpperCase()}', municipio='${data.municipio.toUpperCase()}', estado='${data.estado.toUpperCase()}', cp='${data.cp.toUpperCase()}' WHERE idsucursal = ${idsucursal}`;
            connection.query(sql,(err,result)=>{
                if(!err){ 
                    res.status(200).send({result});
                }else res.status(500).send({message:`Error al actualizar datos: ${err}`});
            });
        }else res.status(500).send({message:`Error al conectar con la base de datos: ${err}`});
        connection.release();
    })

}

function getSucursales(req,res){
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = ` SELECT * FROM sucursales`;
            connection.query(sql,(err,result)=>{
                if(!err){
                    res.status(200).send({result});
                }else res.status(500).send({message:`Error al cosultar en la BD: ${err}`});
            });
        }else res.status(500).send({message:`Error al conectar con la bd: ${err}`});
        connection.release();
    })
}

function getSucursal(req,res){
    var idsucursal = req.params.id;
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `SELECT * FROM sucursales WHERE idsucursal = ${idsucursal}`;
            connection.query(sql,(err,result)=>{
                if(!err){
                    res.status(200).send({result});
                }else res.status(500).send({message:`Error al consultar en la BD: ${err}`});
            });
        }else res.status(500).send({message:`Error al conectar a la BD: ${err}`});
        connection.release();
    })
}

    function setEncargado(req,res){
        var data =  req.body;
        var idsucursal = req.params.id;
        if (!data.idencargado) return res.status(500).send({message: `Error, no se enviaron todos los datos`});
        pool.getConnection((err,connection)=>{
            if(!err){ 
            var sql = `UPDATE sucursales SET idencargado='${data.idencargado}' WHERE idsucursal = ${idsucursal}`;
            connection.query(sql,(err,result)=>{
                if(!err){
                    res.status(200).send({result});
                }else res.status(500).send({message:`Error al actualizar en la bd: ${err}, sql = ${sql}`});
            });
            }else res.status(500).send({message:`Error al conectar con la base de datos: ${err}`});
            connection.release(); 
        })
    }

    function getDetalles(req,res){
        pool.getConnection((err,connection)=>{
            if(!err){
                var sql = `
                    SELECT 
                    sucursales.idsucursal,
                    sucursales.idencargado,
                    sucursales.nombre,
                    sucursales.telefono,
                    sucursales.hora_inicio,
                    sucursales.hora_fin,
                    sucursales.callenum,
                    sucursales.colonia,
                    sucursales.poblacion,
                    sucursales.municipio,
                    sucursales.estado,
                    sucursales.cp,
                    empleados.nombres as empleado_nom,
                    empleados.app_pat as empleado_ap,
                    empleados.app_mat as empleado_am
                    FROM sucursales 
                    LEFT JOIN empleados on sucursales.idencargado = empleados.idempleado
                `;
                connection.query(sql,(err,result)=>{
                    if(!err){
                        res.status(200).send({result});
                    }else res.status(500).send({message:`Error al consultar en la BD: ${err}`});
                });        
            }else res.status(500).send({message:`Error al conectar con la bd: ${err}`});
            connection.release();
        })
    }

module.exports = {
    getSucursales,
    getSucursal,
    addSucursal,
    updateSucursal,
    setEncargado,
    getDetalles
}