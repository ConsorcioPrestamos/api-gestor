'use strict'
const moment = require('moment');
const config = require('../config');
var pool = config.pool;

function getAsignaciones(req,res){
    //var data = req.body.data;
    console.log(req.headers);
    
    var empleado_log = JSON.parse(req.headers.empleado_log);
    console.log(empleado_log);
    
    var sql = (empleado_log.puesto =='ADMINISTRADOR')  ?'SELECT * FROM asignaiones_localidades' 
        :`SELECT * FROM asignaiones_localidades WHERE idempleado = ${empleado_log.idempleado}`;
    console.log(sql); 
    pool.getConnection((err,connection)=>{
        if(!err){
            connection.query(sql,(err, result)=>{
                if(!err){
                    res.status(200).send({result})
                }else return res.status(500).send({message:`Error al consultar con la base de datos: ${err}, sql: ${sql}`});
            });
        }else return res.status(500).send({message:`Error al conectar con la base de datos: ${err}`});
        connection.release();
    });
}

function getLocalidades(req,res){
    pool.getConnection((err, connection)=>{
        if(!err){
            var sql =`SELECT DISTINCT poblacion_negocio as localidad FROM investigaciones WHERE poblacion_negocio != ''`;
            connection.query(sql,(err, result)=>{
                if(!err){
                    res.status(200).send({result});
                }else return res.status(500).send({message:`Error al realizar la consulta ${sql}, --> ${err}`})
            });
        }else return res.status(500).send({message:`Error al conectar en la bd ${err}`});
        connection.release();
    })
}

function asignarLocalidades(req,res){
    var data = req.body; //json con arreglo de asignaciones
    var hoy = moment().format('YYYY-MM-DD');
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `TRUNCATE asignaciones_localidades`; //limpiamos la tabla de asignaciones
            connection.query(sql,(err,result)=>{
                if(!err){
                    console.log(result);
                    data.forEach((row, index) => {
                        // var obj = JSON.stringify(eval('('+row+')'));
                        // var asignacion = JSON.parse(obj);
                        var asignacion = row
                        if(!asignacion.idempleado || !asignacion.localidad) return res.status(500).send({message:`Error, no se mandaron todos los datos`}); 
                        var sql = `INSERT INTO  asignaciones_localidades VALUES(null,'${asignacion.idempleado}','${asignacion.localidad}','${hoy}')`;
                        connection.query(sql,(err,result)=>{
                            if(!err){
                                console.log(result);
                                if(index == data.length-1){
                                    res.status(200).send({result});
                                }
                            }else return res.status(500).send({message:`Error al realizar consulta: ${sql}, -->${err}`})
                        });
                    });
                }else return res.status(500).send({message:`Error al realizar consulta: ${sql}, --> ${err}`})
            })
        }else return res.status(500).send({message:`Error al conectar con la base de datos: ${err}`})
        connection.release();
    });    
}

function getAsignacionesDetalles(req,res){
    pool.getConnection((err, connection)=>{
        if(!err){
            var sql =`
                SELECT 
                idasignacion,
                asignaciones_localidades.idempleado,
                localidad,
                fecha,
                empleados.nombres as empleado_nombre,
                empleados.app_pat as empleado_ap,
                empleados.app_mat as empleados_am,
                empleados.idsucursal
                FROM asignaciones_localidades 
                INNER JOIN empleados ON empleados.idempleado = asignaciones_localidades.idempleado
            `;
            connection.query(sql,(err, result)=>{
                if(!err){
                    res.status(200).send({result});
                }else return res.status(500).send({message:`Error al realizar la consulta ${sql}, --> ${err}`})
            });
        }else return res.status(500).send({message:`Error al conectar en la bd ${err}`});
        connection.release();
    })
}

module.exports={
    getAsignaciones,
    asignarLocalidades,
    getLocalidades,
    getAsignacionesDetalles
}