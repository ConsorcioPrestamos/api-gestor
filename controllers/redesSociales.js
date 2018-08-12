'use strict'
const config = require('../config');
var pool = config.pool;

function addRed(req,res){
    var data = req.body;
    if(!data.idsucursal || !data.nombre_red || !data.url) return res.status(500).send({message:`ERROR, no se enviaron todos los datos`});
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `INSERT INTO redes_sociales VALUES (null , '${data.idsucursal}', '${data.nombre_red.toUpperCase()}', '${data.url}')`;
            connection.query(sql,(err,result)=>{
                if(!err){
                    res.status(200).send({result});
                }else res.status(500).send({message: `Error al insertar en la BD: ${err}`})
            })
        }else res.status(500).send({message:`Error al conectar con la bd: ${err}`});
        connection.release();
    })
}

function updateRed(req,res){
    var data = req.body;
    var idredSocial = req.params.id;
    if(!data.idsucursal || !data.nombre_red || !data.url) return res.status(500).send({message:`Error, no se enviaron todos los datos`});
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `UPDATE redes_sociales SET idsucursal='${data.idsucursal}', nombre_red='${data.nombre_red.toUpperCase()}', url='${data.url}' WHERE idred = ${idredSocial}`;
            connection.query(sql,(err,result)=>{
                if(!err){ 
                    res.status(200).send({result});
                }else res.status(500).send({message:`Error al actualizar datos: ${err}`});
            })
        }else res.status(500).send({message:`Error al conectar con la base de datos: ${err}`});
        connection.release();
    })
}

function getRedes(req,res){
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `SELECT * FROM redes_sociales`;
            connection.query(sql,(err,result)=>{
                if(!err){
                    res.status(200).send({result});
                }else res.status(500).send({message:`ERROR al consultar a la BD ${err}`});
            });
        }else res.status(500).send({message:`Error al conectar con la bd: ${err}`});
        connection.release();
    })
}

function getRed(req,res){
    var idredSocial = req.params.id;
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `SELECT * FROM redes_sociales WHERE idred = ${idredSocial}`;
            connection.query(sql,(err,result)=>{
                if(!err){
                    res.status(200).send({result});
                }else res.status(500).send({message:`ERROR al consultar a la BD ${err}`});
            })
        }else res.status(500).send({message:`Error al conectar con la bd: ${err}`});
        connection.release();
    })
}

module.exports = {
    getRedes,
    getRed,
    addRed,
    updateRed
}