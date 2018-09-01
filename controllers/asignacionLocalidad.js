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

function asignarLocalidades(req,res){
    var data = req.body;
    //llegara un arreglo de asignaciones
    console.log(req.body);
    
}

module.exports={
    getAsignaciones
}