'use strict'
const config = require('../config');
var pool = config.pool;

function addCliente(req,res){
    var data = req.body;
    /**Al añadir un nuevo cliente se añaden un nuevo negocio y una nueva investigacion */
    if(!data.nombres || !data.app_pat || !data.app_mat || !data.telefonos || !data.nombre_negocio || !data.giro || !data.tipo || !data.comentarios || !data.ubicacion || !data.idzona) return res.status(500).send({message:`Error, no se enviaron todos los campos`});
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `INSERT INTO clientes VALUES(null, '${data.nombres.toUpperCase()}', '${data.app_pat.toUpperCase()}', '${data.app_mat.toUpperCase()}', '${data.telefonos}', 'ACTIVO')`;
            connection.query(sql,(err,result)=>{
                if(!err){
                    var idcliente = result.insertId;
                    sql = ` INSERT INTO negocios VALUES (null, ${idcliente}, ${data.id}, '${data.nombre_negocio.toUpperCase()}', '${data.giro.toUpperCase()}', '${data.tipo.toUpperCase()}', '${data.comentarios.toUpperCase()}', '${data.ubicacion}')`;
                    connection.query(sql,(err,result)=>{
                        if(!err){
                            var idnegocio = result.insertId;
                            sql = `INSERT INTO investigaciones (idinvestigacion,idcliente,idnegocio,status) VALUES(null, ${idcliente}, ${idnegocio}, 'PENDIENTE')`;
                            connection.query(sql,(err,result)=>{
                                if(!err){
                                    res.status(200).send({result});
                                }else res.status(500).send({message:`Error al consultar en la BD: ${err}`});
                            }); 
                        }else res.status(500).send({message:`Error al consultar en la BD: ${err}`});
                    }); 
                }else res.status(500).send({message:`Error al consultar en la BD: ${err}`});
            });        
        }else res.status(500).send({message:`Error al conectar con la bd: ${err}`});
        connection.release();
    })
}

function updateCliente(req,res){
    //solo se actualizan los datos de la tabla clientes
    var idcliente = req.params.id;
    var data= req.body;
    if(!data.nombres || !data.app_pat || !data.app_mat || !data.telefonos || !data.status) return res.status(500).send({message:`Error, no se enviaron todos los campos`});
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `UPDATE clientes SET
                nombres='${data.nombres.toUpperCase()}', app_pat='${data.app_pat.toUpperCase()}', app_mat='${data.app_mat.toUpperCase()}', telefonos='${data.telefonos}', status='${data.status.toUpperCase()}' WHERE idcliente=${idcliente}`;
            connection.query(sql,(err,result)=>{
                if(!err){
                    res.status(200).send({result});
                }else res.status(500).send({message:`Error al consultar en la BD: ${err}`});
            });        
        }else res.status(500).send({message:`Error al conectar con la bd: ${err}`});
        connection.release();
    })
}

function getClientes(req,res){
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `SELECT * FROM clientes`;
            connection.query(sql,(err,result)=>{
                if(!err){
                    res.status(200).send({result});
                }else res.status(500).send({message:`Error al consultar en la BD: ${err}`});
            });        
        }else res.status(500).send({message:`Error al conectar con la bd: ${err}`});
        connection.release();
    })
}

function getCliente(req,res){
    var idcliente = req.params.id;
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `SELECT * FROM clientes WHERE idcliente = ${idcliente}`;
            connection.query(sql,(err,result)=>{
                if(!err){
                    res.status(200).send({result});
                }else res.status(500).send({message:`Error al consultar en la BD: ${err}`});
            });        
        }else res.status(500).send({message:`Error al conectar con la bd: ${err}`});
        connection.release();
    })
}
module.exports ={
    addCliente,
    updateCliente,
    getClientes,
    getCliente
}