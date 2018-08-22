'use strict'
const config = require('../config');
var pool = config.pool;

function addZona(req,res){
    var data = req.body;
    if(!data.idsucursal || !data.nombre_zona || !data.colonias || !data.status || !data.idempleado) return res.status(500).send({message:`ERROR, no se enviaron todos los datos`});
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `INSERT INTO zonas VALUES (null,'${data.idsucursal}' ,${data.idempleado}, '${data.nombre_zona.toUpperCase()}', '${data.colonias.toUpperCase()}', '${data.status.toUpperCase()}')`;
            connection.query(sql,(err,result)=>{
            if(!err){
                res.status(200).send({result});
            }else return res.status(500).send({message: `Error al insertar en la BD: ${err}`})
        })
        }else return res.status(500).send({message:`Error al conectar con la base de datos: ${err}`});
        connection.release();
    })
}

function updateZona(req,res){
    var data = req.body;
    var idzona = req.params.id; 
    if(!data.idsucursal || !data.nombre_zona || !data.colonias || !data.status) return res.status(500).send({message:`ERROR, no se enviaron todos los datos`});
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `UPDATE zonas SET idzona='${data.idzona}', idsucursal='${data.idsucursal}', nombre_zona='${data.nombre_zona.toUpperCase()}', colonias='${data.colonias.toUpperCase()}', status = '${data.status.toUpperCase()}' WHERE idzona = ${idzona}`;
            connection.query(sql,(err,result)=>{
                if(!err){ 
                    res.status(200).send({result});
                }else return res.status(500).send({message:`Error al actualizar datos: ${err}`});
            });
        }else return res.status(500).send({message:`Error al conectar con la base de datos: ${err}`});
        connection.release();
    })

}


function getZonas(req,res){
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `SELECT * FROM zonas`;
            connection.query(sql,(err,result)=>{
                if(!err){
                    res.status(200).send({result});
                }else return res.status(500).send({message:`Error al cosultar en la BD: ${err}`});
            });
        }else return res.status(500).send({message:`Error al conectar con la bd: ${err}`});
        connection.release();
    })
}

function getZona(req,res){
    var idzona = req.params.id;
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `SELECT * FROM zonas WHERE idzona = ${idzona}`;
            connection.query(sql,(err,result)=>{
                if(!err){
                    res.status(200).send({result});
                }else return res.status(500).send({message:`Error al consultar en la BD: ${err}`});
            });
        }else return res.status(500).send({message:`Error al conectar con la bd: ${err}`});
        connection.release();
    })
}

function setEmpleado(req,res){
    var data = req.body;
    var idzona = req.params.id;
    if (!data.idempleado) return res.status(500).send({message: `Error, no se enviaron todos los datos`});
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `UPDATE zonas SET idempleado='${data.idempleado}' WHERE idzona = ${idzona}`;
            connection.query(sql,(err,result)=>{
                if(!err){
                    res.status(200).send({result});
                }else return res.status(500).send({message:`Error al actualizar en la bd: ${err}, sql = ${sql}`});
            });
        }else return res.status(500).send({message:`Error al conectar con la base de datos: ${err}`});
        connection.release(); 
    })
}

function getDetalles(req,res){
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `
                SELECT 
                zonas.idzona,
                zonas.idsucursal,
                zonas.idempleado,
                zonas.nombre_zona,
                zonas.nombre_zona,
                zonas.colonias,
                zonas.status,
                empleados.nombres as empleado_nom,
                empleados.app_pat as empleado_ap,
                empleados.app_mat as empleado_am
                FROM zonas
                LEFT JOIN empleados on zonas.idempleado = empleados.idempleado
            `;
            connection.query(sql,(err,result)=>{
                if(!err){
                    res.status(200).send({result});
                }else return res.status(500).send({message:`Error al consultar en la BD: ${err}`});
            });        
        }else return res.status(500).send({message:`Error al conectar con la bd: ${err}`});
        connection.release();
    })
}

module.exports = {
    getZonas,
    getZona,
    addZona,
    updateZona,
    setEmpleado,
    getDetalles
}