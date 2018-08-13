'use strict'
const config = require('../config');
var pool = config.pool;

function addNegocio(req,res){
    var data = req.body;
    if(!data.idcliente || !data.nombre_negocio || !data.giro || !data.tipo || !data.comentarios || !data.ubicacion || !data.idzona) return res.status(500).send({message:`Error, no se enviaron todos los campos`});
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = ` INSERT INTO negocios VALUES (null, ${data.idcliente}, ${data.idzona}, '${data.nombre_negocio.toUpperCase()}', '${data.giro.toUpperCase()}', '${data.tipo.toUpperCase()}', '${data.comentarios.toUpperCase()}', '${data.ubicacion}')`;
            connection.query(sql,(err,result)=>{
                if(!err){
                    var idnegocio = result.insertId;
                    sql = `SELECT * FROM investigaciones WHERE idcliente=${data.idcliente}`;
                    connection.query(sql,(err,result)=>{
                        if(!err){
                            var i= result[0];
                            sql = `INSERT INTO investigaciones VALUES(null, ${data.idcliente}, ${idnegocio}, '${i.fecha_nacimiento}', '${i.edad}', '${i.edo_civil}',
                            '${i.calle}', '${i.num_ext}', '${i.num_int}', '${i.colonia}', '${i.municipio}', '${i.estado}', '${i.poblacion}', '${i.tel}', '${i.casa_propia}',
                            '${i.num_dependientes}',null, '${i.tipo_comprobante}', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 'PENDIENTE')`;
                            connection.query(sql,(err,result)=>{
                                if(!err){
                                    res.status(200).send({result});
                                }else res.status(500).send({message:`Error al consultar en la BD: ${err} sql: ${sql}`});
                            }); 
                        }else res.status(500).send({message:`Error al consultar en la BD: ${err} sql: ${sql}`});
                    });  
                }else res.status(500).send({message:`Error al consultar en la BD: ${err} sql: ${sql}`});
            });        
        }else res.status(500).send({message:`Error al conectar con la bd: ${err}`});
        connection.release();
    })
}

function updateNegocio(req,res){
    var data = req.body;
    var idnegocio = req.params.id;
    if(!data.idcliente || !data.nombre_negocio || !data.giro || !data.tipo || !data.comentarios || !data.ubicacion || !data.idzona) return res.status(500).send({message:`Error, no se enviaron todos los campos`});
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `UPDATE negocios SET idcliente=${data.idcliente}, idzona=${data.idzona} , nombre_negocio='${data.nombre_negocio.toUpperCase()}', giro='${data.giro.toUpperCase()}', tipo='${data.tipo.toUpperCase()}', comentarios='${data.comentarios.toUpperCase()}', ubicacion='${data.ubicacion}' WHERE idnegocio=${idnegocio}`;
            connection.query(sql,(err,result)=>{
                if(!err){
                    res.status(200).send({result});
                }else res.status(500).send({message:`Error al consultar en la BD: ${err}`});
            });        
        }else res.status(500).send({message:`Error al conectar con la bd: ${err}`});
        connection.release();
    })
}

function getNegocios(req,res){
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `SELECT * FROM negocios`;
            connection.query(sql,(err,result)=>{
                if(!err){
                    res.status(200).send({result});
                }else res.status(500).send({message:`Error al consultar en la BD: ${err}`});
            });        
        }else res.status(500).send({message:`Error al conectar con la bd: ${err}`});
        connection.release();
    })
}

function getNegocio(req,res){
    var idnegocio = req.params.id;
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `SELECT * FROM negocios WHERE idnegocio=${idnegocio}`;
            connection.query(sql,(err,result)=>{
                if(!err){
                    res.status(200).send({result});
                }else res.status(500).send({message:`Error al consultar en la BD: ${err}`});
            });        
        }else res.status(500).send({message:`Error al conectar con la bd: ${err}`});
        connection.release();
    })
}

function getDetalles(req,res){
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `
                SELECT 
                negocios.idnegocio,
                negocios.idcliente,
                negocios.idzona,
                negocios.nombre_negocio,
                negocios.giro,
                negocios.tipo,
                negocios.comentarios,
                negocios.ubicacion,
                clientes.nombres as cliente_nom,
                clientes.app_pat as cliente_ap,
                clientes.app_mat as cliente_am,
                zonas.nombre_zona
                FROM negocios
                INNER JOIN clientes on clientes.idcliente = negocios.idcliente
                INNER JOIN zonas on negocios.idzona = zonas.idzona
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
    addNegocio,
    updateNegocio,
    getNegocios,
    getNegocio,
    getDetalles
}