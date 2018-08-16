'use strict'
const config = require('../config');
var pool = config.pool;
var moment = require('moment');

function updateInvestigacion(req,res){
    var data = req.body;
    var idinvestigacion = req.params.id;
    console.log(data);
    var fecha_actual = moment().format('YYYY-MM-DD');
    if(
        !data.idcliente 
        || !data.idnegocio 
        || !data.nombres 
        || !data.app_pat 
        || !data.app_mat 
        || !data.telefonos 
        || !data.nombre_negocio 
        || !data.giro 
        || !data.tipo 
        || !data.comentarios 
        || !data.ubicacion
        || !data.fecha_nacimiento 
        || !data.edad 
        || !data.edo_civil 
        || !data.calle 
        || !data.num_ext 
        || !data.num_int 
        || !data.colonia 
        || !data.municipio 
        || !data.estado 
        || !data.poblacion 
        || !data.tel 
        || !data.casa_propia 
        || !data.num_dependientes 
        || !data.monto_credito 
        || !data.tipo_comprobante 
        || !data.calle_negocio 
        || !data.num_ext_negocio 
        || !data.num_int_negocio 
        || !data.colonia_negocio 
        || !data.municipio_negocio 
        || !data.estado_negocio 
        || !data.poblacion_negocio
        || !data.horario 
        || !data.nombre_aval 
        || !data.tiempo_aval 
        || !data.tel_aval 
        || !data.nombre_fam 
        || !data.parentezco 
        || !data.tel_fam 
        || !data.como_supo 
        || !data.especificar
    ) 
    return res.status(500).send({message:`Error, no se enviaron todos los campos`});
    /**al actualizar una investigacion se actualizan los datos del cliente y del negocio */
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `UPDATE clientes SET nombres='${data.nombres.toUpperCase()}', app_pat='${data.app_pat.toUpperCase()}', app_mat='${data.app_mat.toUpperCase()}', telefonos='${data.telefonos}', status='ACTIVO' WHERE idcliente=${data.idcliente}`;
            connection.query(sql,(err,result)=>{
                if(!err){
                    sql = `UPDATE negocios SET idcliente=${data.idcliente}, nombre_negocio='${data.nombre_negocio.toUpperCase()}', giro='${data.giro.toUpperCase()}', tipo='${data.tipo.toUpperCase()}', comentarios='${data.comentarios.toUpperCase()}', ubicacion='${data.ubicacion}' WHERE idnegocio=${data.idnegocio}`;
                    connection.query(sql,(err,result)=>{
                        if(!err){
                            sql = `
                                UPDATE investigaciones SET 
                                fecha_nacimiento = '${data.fecha_nacimiento.toUpperCase()}',
                                edad = '${data.edad.toUpperCase()}',
                                edo_civil = '${data.edo_civil.toUpperCase()}',
                                calle = '${data.calle.toUpperCase()}',
                                num_ext = '${data.num_ext}' ,
                                num_int = '${data.num_int}',
                                colonia = '${data.colonia.toUpperCase()}',
                                municipio = '${data.municipio.toUpperCase()}',
                                estado = '${data.estado.toUpperCase()}',
                                poblacion = '${data.poblacion.toUpperCase()}',
                                tel = '${data.tel}',
                                casa_propia = '${data.casa_propia.toUpperCase()}',
                                num_dependientes = '${data.num_dependientes}',
                                monto_credito = '${data.monto_credito}',
                                tipo_comprobante = '${data.tipo_comprobante.toUpperCase()}',
                                calle_negocio = '${data.calle_negocio.toUpperCase()}',
                                num_ext_negocio = '${data.num_ext_negocio}',
                                num_int_negocio = '${data.num_int_negocio}',
                                colonia_negocio = '${data.colonia_negocio.toUpperCase()}',
                                municipio_negocio = '${data.municipio_negocio.toUpperCase()}',
                                estado_negocio = '${data.estado_negocio.toUpperCase()}',
                                poblacion_negocio = '${data.poblacion_negocio.toUpperCase()}',
                                horario =  '${data.horario.toUpperCase()}',
                                nombre_aval = '${data.nombre_aval.toUpperCase()}',
                                tiempo_aval = '${data.tiempo_aval.toUpperCase()}',
                                tel_aval = '${data.tel_aval.toUpperCase()}',
                                nombre_fam = '${data.nombre_fam.toUpperCase()}',
                                parentezco = '${data.parentezco.toUpperCase()}',
                                tel_fam = '${data.tel_fam}',
                                como_supo = '${data.como_supo.toUpperCase()}',
                                especificar = '${data.especificar.toUpperCase()}',
                                fecha = '${fecha_actual}',
                                status = 'REALIZADA'
                                WHERE idinvestigacion = ${idinvestigacion}
                            `;
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

function getInvestgaciones(req,res){
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `SELECT * FROM investigaciones`;
            connection.query(sql,(err,result)=>{
                if(!err){
                    res.status(200).send({result});
                }else res.status(500).send({message:`Error al consultar en la BD: ${err}`});
            });        
        }else res.status(500).send({message:`Error al conectar con la bd: ${err}`});
        connection.release();
    })
}

function getInvestgacionesPendientes(req,res){
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `
                SELECT
                idinvestigacion,
                investigaciones.idcliente,
                investigaciones.idnegocio,
                clientes.nombres,
                clientes.app_pat,
                clientes.app_mat,
                clientes.telefonos,
                negocios.nombre_negocio
                FROM investigaciones
                INNER JOIN clientes ON clientes.idcliente = investigaciones.idcliente
                INNER JOIN negocios ON negocios.idnegocio = investigaciones.idnegocio
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

module.exports ={
    updateInvestigacion,
    getInvestgaciones,
    getInvestgacionesPendientes
}