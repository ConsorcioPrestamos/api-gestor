'use strict'
const config = require('../config');
var pool = config.pool;

function addTipoCredito(req,res){
    var data = req.body;
    console.log(data);
    if(data.idempresa == null || !data.descripcion || !data.tipo || !data.tiempo || !data.interes) return res.status(500).send({message:`ERROR, no se enviaron todos los datos`});
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `INSERT INTO tipos_creditos VALUES(null, '${data.idempresa}', '${data.descripcion.toUpperCase()}', '${data.tipo.toUpperCase()}', '${data.tiempo}', '${data.interes}', 'ACTIVO')`;
            connection.query(sql,(err,result)=>{
                if(!err){
                    res.status(200).send({result});
                }else return res.status(500).send({message: `Error al insertar en la BD: ${err}`})
            })
        }else return res.status(500).send({message:`Error al conectar con la base de datos: ${err}`});
        connection.release();
    })
}

function updateTipoCredito(req,res){
    var data = req.body;
    console.log(data);
    var idtipo = req.params.id;
    if(!data.idempresa || !data.descripcion || !data.tipo || !data.tiempo || !data.interes) return res.status(500).send({message:`ERROR, no se enviaron todos los datos`});
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `UPDATE tipos_creditos SET idtipo='${data.idtipo}', idempresa='${data.idempresa}', descripcion='${data.descripcion.toUpperCase()}', tipo='${data.tipo.toUpperCase()}', tiempo='${data.tiempo}', interes='${data.interes}', status='ACTIVO' WHERE idtipo = ${idtipo}`;
            connection.query(sql,(err,result)=>{
                if(!err){ 
                    res.status(200).send({result});
                }else return res.status(500).send({message:`Error al actualizar datos: ${err}`});
            });
        }else return res.status(500).send({message:`Error al conectar con la base de datos: ${err}`});
        connection.release();
    })

}

function getTiposCreditos(req,res){
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `SELECT * FROM tipos_creditos`;
            connection.query(sql,(err,result)=>{
                if(!err){
                    res.status(200).send({result});
                }else return res.status(500).send({message:`Error al cosultar en la BD: ${err}`});
            });
        }else return res.status(500).send({message:`Error al conectar con la bd: ${err}`});
        connection.release();
    })
}

function getTipoCredito(req,res){
    var idtipo = req.params.id;
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `SELECT * FROM tipos_creditos WHERE idtipo = ${idtipo}`;
            connection.query(sql,(err,result)=>{
                if(!err){
                    res.status(200).send({result});
                }else return res.status(500).send({message:`Error al consultar en la BD: ${err}`});
            });        
        }else return res.status(500).send({message:`Error al conectar con la bd: ${err}`});
        connection.release();
    })
}

function getDetalles(req,res){
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `
                SELECT
                tipos_creditos.idtipo, 
                tipos_creditos.idempresa,
                tipos_creditos.descripcion,
                tipos_creditos.tipo,
                tipos_creditos.tiempo,
                tipos_creditos.interes,
                tipos_creditos.status,
                empresas.razon_social as empresa_rs
                FROM tipos_creditos
                INNER JOIN empresas on tipos_creditos.idempresa = empresas.idempresa
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
    getTiposCreditos,
    getTipoCredito,
    addTipoCredito,
    updateTipoCredito,
    getDetalles
}