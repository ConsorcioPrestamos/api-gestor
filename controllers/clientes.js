'use strict'
const config = require('../config');
var pool = config.pool;

/*
	NOTAS
	Al añadir un nuevo cliente se añaden un nuevo negocio y una nueva investigacion.
*/

function addCliente(req,res){
    var data = req.body;
    if(
    	//Validar datos del cliente
    	!data.nombres || 
    	!data.app_pat || 
    	!data.app_mat || 
    	!data.telefonos || 
    	//validar datos del negocio
    	!data.nombre_negocio || 
    	!data.giro || 
    	!data.tipo || 
    	!data.comentarios || 
    	!data.ubicacion || //lat,lng
    	!data.idzona ||
    	!data.propietario || //si, no
    	!data.antiguedad || 
    	!data.arrendamiento //si, no
    ) return res.status(500).send({message:`Error, no se enviaron todos los campos`});

    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `INSERT INTO clientes VALUES(null, 
            	'${data.nombres.toUpperCase()}', 
            	'${data.app_pat.toUpperCase()}', 
            	'${data.app_mat.toUpperCase()}', 
            	'${data.telefonos}', 
            	'ACTIVO')`;
            connection.query(sql,(err,cliente)=>{
                if(!err){
                    var idcliente = cliente.insertId;
                    sql = ` INSERT INTO negocios VALUES (
                    	null, 
                    	${idcliente}, 
                    	${data.idzona}, 
                    	'${data.nombre_negocio.toUpperCase()}', 
                    	'${data.giro.toUpperCase()}', '${data.tipo.toUpperCase()}', 
                    	'${data.comentarios.toUpperCase()}', 
                    	'${data.ubicacion}', 
                    	'${data.propietario.toUpperCase()}', 
                    	'${data.antiguedad.toUpperCase()}', 
                    	'${data.arrendamiento.toUpperCase}')`;
                    connection.query(sql,(err,negocio)=>{
                        if(!err){
                            var idnegocio = negocio.insertId;
                            sql = `INSERT INTO investigaciones (idinvestigacion,idcliente,idnegocio,status) VALUES(null, ${idcliente}, ${idnegocio}, 'PENDIENTE')`;
                            connection.query(sql,(err,investigacion)=>{
                                if(!err){
                                    res.status(200).send({cliente,negocio,investigacion});
                                }else res.status(500).send({message:`Error al consultar en la BD: ${err}`});
                            }); 
                        }else {
                        	sql=`DELETE FROM clientes WHERE idcliente = ${idcliente}`;
                        	connection.query()
                        	res.status(500).send({message:`Error al consultar en la BD: ${err}`});
                        }
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