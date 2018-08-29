'use strict'
const moment = require('moment');
const config = require('../config');
var pool = config.pool;

var dbConnection = config.connection;


function getCobros(req,res){
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `SELECT * FROM cobros`;
            connection.query(sql,(err,result)=>{
                if(!err){
                    res.status(200).send({result});
                }else return res.status(500).send({message:`Error al consultar en la bd: ${err}`});
            });
        }else return res.status(500).send({message:`Error al conectar con la bd: ${err}`});
        connection.release();
    })
}

function getCobrosPorCliente(req,res){
    var idCliente = req.params.id;
    var connection = dbConnection();
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `SELECT * FROM cobros WHERE idcliente='${idCliente}' `;
            connection.query(sql,(err,result)=>{
                if(!err){
                    res.status(200).send({result});
                }else return res.status(500).send({message:`Error al consultar en la bd: ${err}`});
            });
        }else return res.status(500).send({message:`Error al conectar con la bd: ${err}`});
        connection.release();
    })
}


function getCobrosXRealizar(req,res){
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `SELECT * FROM cobros WHERE status='Pendiente' `;
            connection.query(sql,(err,result)=>{
                if(!err){
                    res.status(200).send({result});
                }else res.status(500).send({message:`Error al consultar en la bd: ${err}`});
            });
        }else res.status(500).send({message:`Error al conectar con la bd: ${err}`});
        connection.release();
    })
};



function getCobrosAtrasados(req,res){
    var connection = dbConnection();
    var atrasados = [];
    var hoy=moment().format('YYYY-MMM-DD');
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `SELECT * FROM cobros`;
            connection.query(sql,(err,result)=>{
                if(!err){
                    console.log(result[0].fecha_cobro);
                    for(let i=0; i< result.length; i++){
                        var dateObj = new Date((result[i].fecha_cobro));
                        var momentObj = moment(dateObj);
                        var momentString = momentObj.format('YYYY-MM-DD');
                        console.log(momentString);

                        if(moment(momentString).isBefore(hoy)){
                            atrasados.push(result[i]);
                        }

                    }
                    if(atrasados.length >= 1){
                    res.status(200).send({result:atrasados});  
                    }else{
                        res.status(200).send({message:`No hay cobros atrasados`}); 
                    }
                }else res.status(500).send({message:`Error al consultar en la bd: ${err}`});
            });
        }else return res.status(500).send({message:`Error al conectar con la bd: ${err}`});
        connection.release();
    })
};

function cobrosDetalles(req,res){
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `
                SELECT  
                cobros.idcobro,
                cobros.idcredito,
                cobros.idcliente AS idcliente_cobro,
                cobros.idempleado,
                cobros.fecha_cobro,
                cobros.cantidad_cobro,
                cobros.comentario_cobro,
                cobros.status,
                negocios.nombre_negocio,
                negocios.tipo as tipo_negocio,
                negocios.giro as giro_negocio,
                clientes.nombres as nombre_cliente,
                clientes.app_pat as app_pat_cliente,
                clientes.app_mat as app_mat_cliente,
                clientes.telefonos,
                zonas.idzona,
                zonas.nombre_zona,
                zonas.idempleado,
                investigaciones.calle_negocio,
                investigaciones.num_int_negocio,
                investigaciones.num_ext_negocio
                FROM
                cobros 
                INNER JOIN clientes on cobros.idcliente = clientes.idcliente 
                INNER JOIN creditos on cobros.idcredito = creditos.idcredito
                INNER JOIN negocios on creditos.idcredito = cobros.idcredito AND creditos.idnegocio = negocios.idnegocio
                INNER JOIN investigaciones on cobros.idcliente = investigaciones.idcliente AND creditos.idcredito = cobros.idcredito AND creditos.idnegocio = negocios.idnegocio and investigaciones.idnegocio = negocios.idnegocio
                INNER JOIN zonas on zonas.idzona = negocios.idzona AND creditos.idcredito = cobros.idcredito AND creditos.idnegocio = negocios.idnegocio
            `;
            connection.query(sql,(err,result)=>{
                if(!err){
                    res.status(200).send({result});
                }else return res.status(500).send({message:`Error al consultar en la base de datos: ${err}, sql= ${sql}`});
            });
        }else return res.status(500).send({message:`Error al conectar con la bd: ${err}`});
        connection.release();
    })
}

function cobrosXRealizarDia(req,res){

    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `
                SELECT  
                cobros.idcobro,
                cobros.idcredito,
                cobros.idcliente AS idcliente_cobro,
                cobros.idempleado,
                cobros.fecha_cobro,
                cobros.cantidad_cobro,
                cobros.comentario_cobro,
                cobros.status,
                negocios.nombre_negocio,
                negocios.tipo as tipo_negocio,
                negocios.giro as giro_negocio,
                clientes.nombres as nombre_cliente,
                clientes.app_pat as app_pat_cliente,
                clientes.app_mat as app_mat_cliente,
                clientes.telefonos,
                zonas.idzona,
                zonas.nombre_zona,
                zonas.idempleado,
                investigaciones.calle_negocio,
                investigaciones.num_int_negocio,
                investigaciones.num_ext_negocio
                FROM
                cobros 
                INNER JOIN clientes on cobros.idcliente = clientes.idcliente 
                INNER JOIN creditos on cobros.idcredito = creditos.idcredito
                INNER JOIN negocios on creditos.idcredito = cobros.idcredito AND creditos.idnegocio = negocios.idnegocio
                INNER JOIN investigaciones on cobros.idcliente = investigaciones.idcliente AND creditos.idcredito = cobros.idcredito AND creditos.idnegocio = negocios.idnegocio and investigaciones.idnegocio = negocios.idnegocio
                INNER JOIN zonas on zonas.idzona = negocios.idzona AND creditos.idcredito = cobros.idcredito AND creditos.idnegocio = negocios.idnegocio
            `;
            var data = [];
            var hoy = moment().format('YYYY-MM-DD');
            connection.query(sql,(err,result)=>{
                if(err)  return res.status(500).send({message:`Error en la consulta ${err}`});
                if(!err){
                    for(let i=0; i< result.length; i++){
                        var momentObj = moment(result[i]).format('YYYY-MM-DD');
                        // console.log('asdasasd'+momentObj);
                        var status =result[i].status;
                        if(status=='Pendiente'){
                            if(status=='Pendiente' && result[i].fecha_cobro==hoy || moment(momentObj).isBefore(hoy) ){
                                // console.log(moment(momentString)+'='+hoy)
                                console.log('--------->status', result[i].status);
                                data.push(result[i]);
                            }
                        }                     
                    }
                    console.log(`Data--->`);
                    console.log(data);
                    
                    res.status(200).send({'result':data});
                }
            });
        }else return  res.status(500).send({message:`Error al conectar con la bd: ${err}`});
        connection.release();
    })
    
}

function pagoRequerido(req,res){
    // var idcobro= req.body.cobro.idcobro;
    var idcobro = req.body.idcobro
    var comentario = req.body.comentario
    console.log(idcobro+'   '+comentario);
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql=`Update cobros SET status='Pagado', comentario_cobro='${comentario}' WHERE idcobro=${idcobro}`
            connection.query(sql,(err,result)=>{
                if(err) return res.status(500).send({message:`ERROR ${err}`});
                if(!err && result){
                    res.status(200).send({result:`cobro modificada con exito`});
                }
            });
        }else return res.status(500).send({message:`Error al conectar con la bd: ${err}`});
        connection.release();
    })

}
function pagoCompleto(req,res){
    // var idcredito= req.body.cobro.idcredito;
    var idcredito= req.body.idcredito;
    var comentario = req.body.comentario
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql =`UPDATE cobros SET status='Pagado', comentario_cobro='${comentario}' WHERE idcredito=${idcredito} AND status='Pendiente'`
            connection.query(sql,(err,result)=>{
                if(err)return  res.status(500).send({message:`ERROR ${err} --- sql${sql}`});
                if(!err){
                    console.log(result);
                    res.status(200).send({result:`cobros modificada con exito`});
                }
            });
        }else return res.status(500).send({message:`Error al conectar con la bd: ${err}`});
        connection.release();
    })
}


function pagoExacto(req,res){
    var info_cobro = req.body.cobro;
    //var info_cobro=req.body.cobro; //datos del cobro
    var cantidad_a_pagar=req.body.cantidad; //cantidad exacta que se abonara 
    var comentario = req.body.comentario;
    var sql;//para las consultas a la bd.
    console.log(req.body);
    var connection = dbConnection()
    connection.connect((err)=>{
        if(!err){
            sql=`SELECT * FROM cobros WHERE idcredito=${info_cobro.idcredito} AND status = 'Pendiente'`;
            connection.query(sql,(err,cobros)=>{
                if(!err){
                    if(cantidad_a_pagar >= parseFloat(cobros[0].cantidad_cobro)  && cantidad_a_pagar > 0 ){ 
                        console.log('paso la condicion 1 --> if(cantidad_a_pagar > info_cobro.cobro_cantidad_cobro) ');
                            console.log('entro -------------------');
                            for(let i=0; i < cobros.length ; i++){
                                var idcobro = cobros[i].idcobro;
                                if( parseFloat(cobros[i].cantidad_cobro) > parseFloat(cantidad_a_pagar)  ) {
                                    console.log(`Paso la condicion 2: --> ${cobros[i].cantidad_cobro} > ${cantidad_a_pagar}`);
                                    var nueva_c= parseFloat(cobros[i].cantidad_cobro) - parseFloat(cantidad_a_pagar);
                                    console.log(nueva_c);
                                    sql = `UPDATE cobros SET cantidad_cobro='${nueva_c}', comentario_cobro='${comentario}' WHERE idcobro=${cobros[i].idcobro}`;
                                    i = cobros.length + 1;
                                    cantidad_a_pagar = 0.00;
                                    connection.query(sql,(err,result)=>{
                                        if(!err){
                                            i = cobros.length;
                                            res.status(200).send(result);
                                        }else{
                                            cantidad_a_pagar = req.body.cantidad;
                                            res.status(500).send({message:`Error al actualizar: ${err}`});
                                        } 
                                        connection.destroy();
                                    });
                                }else if( parseFloat(cobros[i].cantidad_cobro) <= cantidad_a_pagar){
                                    cantidad_a_pagar = parseFloat(cantidad_a_pagar) - parseFloat(cobros[i].cantidad_cobro); 
                                    console.log(`Paso la condicion 3: --> ${cobros[i].cantidad_cobro} <= ${cantidad_a_pagar}`);
                                    sql = `UPDATE cobros SET status='Pagado', comentario_cobro='${comentario}' WHERE idcobro=${cobros[i].idcobro}`;
                                    connection.query(sql,(err,resultUpdate)=>{
                                        if(!err){
                                            console.log(cantidad_a_pagar); 
                                        }else{
                                            cantidad_a_pagar = parseFloat(cantidad_a_pagar) + parseFloat(cobros[i].cantidad_cobro); 
                                            res.status(500).send({message:`Error al hacer update ${err}`});
                                        }
                                    });
                                }
                            }    
                    }else res.status(500).send({message:`Error en la consulta ${err}, sql==> ${sql}`});
                }else{
                    console.log(err);
                    connection.destroy();
                    console.log(info_cobro);
                }
            });
        }else {
            connection.destroy();
            res.status(500).send({message:`Error al conectar con la bd ${err}`});
        }
    });
    
}


module.exports={
    getCobros,
    getCobrosPorCliente,
    getCobrosXRealizar,
    getCobrosAtrasados,
    getCobrosAtrasados,
    cobrosXRealizarDia,
    pagoRequerido,
    pagoCompleto,
    pagoExacto,
    cobrosDetalles
}