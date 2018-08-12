'use strict'
const config = require('../config');
var pool = config.pool;

function addEmpresa(req,res){
    var data = req.body;
    if(!data.razon_social || !data.direccion || !data.descripcion || !data.rfc ) return  res.status(500).send({message:`Error no se enviaron todos los datos`});
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `INSERT INTO empresas VALUES(null,'${data.razon_social.toUpperCase()}','${data.direccion.toUpperCase()}','${data.descripcion.toUpperCase()}','${data.rfc.toUpperCase()}')`;
            connection.query(sql,(err,result)=>{
                if(!err){
                    res.status(200).send({result});
                }else res.status(500).send({message:`Error al insertar en la bd: ${err}, sql = ${sql}`});
            });
        }else res.status(500).send({message:`Error al conectar con la bd: ${err}`});
        connection.release();
    })
}

function updateEmpresa(req,res){
    var data = req.body;
    var idempresa = req.params.id;
    if(!data.razon_social || !data.direccion || !data.descripcion || !data.rfc )  res.status(500).send({message:`Error no se enviaron todos los datos`});
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `UPDATE empresas SET razon_social='${data.razon_social.toUpperCase()}', direccion='${data.direccion.toUpperCase()}', descripcion='${data.descripcion.toUpperCase()}', rfc='${data.rfc.toUpperCase()}' WHERE idempresa = ${idempresa}`;
            connection.query(sql,(err,result)=>{
                if(!err){
                    res.status(200).send({result});
                }else res.status(500).send({message:`Error al actualizar en la bd: ${err}, sql = ${sql}`});
            });
        }else res.status(500).send({message:`Error al conectar con la bd: ${err}`});
        connection.release();
    })
}

function getEmpresas(req,res){
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `SELECT * FROM empresas`;
            connection.query(sql,(err,result)=>{
                if(!err){
                    res.status(200).send({result});
                }else res.status(500).send({message:`Error al consultar en la bd: ${err}`});
            });
        }else res.status(500).send({message:`Error al conectar con la bd: ${err}`});
        connection.release();
    })
}

function getEmpresa(req,res){
    var idempresa = req.params.id;
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `SELECT * FROM empresas WHERE idempresa = ${idempresa}`;
            connection.query(sql,(err,result)=>{
                if(!err){
                    res.status(200).send({result});
                }else res.status(500).send({message:`Error al consultar en la bd: ${err}`});
            });
        }else res.status(500).send({message:`Error al conectar con la bd: ${err}`});
        connection.release();
    })
}

module.exports = {
    getEmpresas,
    getEmpresa,
    addEmpresa,
    updateEmpresa
}