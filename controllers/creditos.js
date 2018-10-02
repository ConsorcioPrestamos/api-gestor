'use strict'
const moment = require('moment');
const config = require('../config');
var pool = config.pool;

let getCreditos=(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = ``;
            connection.query(`SELECT * FROM creditos `, (err, result, fields)=>{
                if(err) return  res.status(500).send({message:`Error en la consulta ${err}`});
                if(!err){
                    res.status(200).send({result:result});
                }
            })        
        }else return res.status(500).send({message:`Error al conectar con la bd: ${err}`});
        connection.release();
    })    
}

function getCreditosSinAprobar(req,res){
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `
            SELECT
            idcredito,
            creditos.idcliente,
            creditos.idnegocio,
            idsucursal,
            fecha_solicitud,
            monto_solicitado,
            monto_interes,
            monto_conInteres,
            empleado_captura,
            creditos.tipo_credito,
            creditos.status,
            fecha_aprobacion,
            creditos.tiempo,
            creditos.interes,
            nombres AS cliente_nombre,
            negocios.nombre_negocio AS cliente_negocio,
            clientes.telefonos AS cliente_telefono,
            tipos_creditos.descripcion,
            clientes.nombres AS cliente_nombres,
            clientes.app_pat AS cliente_app_pat,
            clientes.app_mat AS cliente_app_mat,
            negocios.tipo as tipo_negocio
            FROM creditos
            INNER JOIN clientes ON creditos.idcliente = clientes.idcliente
            INNER JOIN negocios ON creditos.idnegocio = negocios.idnegocio
            INNER JOIN tipos_creditos ON creditos.tipo_credito = tipos_creditos.idtipo
            WHERE creditos.status = '?'
            `;
            connection.query(sql,(err,result)=>{
                if(!err){
                    res.status(200).send({result});
                }else return res.status(500).send({message:`Error al consultar en la BD: ${err}`});
            });        
        }else return res.status(500).send({message:`Error al conectar con la bd: ${err}`});
        connection.release();
    });
}

function getFinales(req,res){
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `
            SELECT
            idcredito,
            creditos.idcliente,
            creditos.idnegocio,
            idsucursal,
            fecha_solicitud,
            monto_aprobado,
            monto_solicitado,
            monto_interes,
            monto_conInteres,
            empleado_captura,
            creditos.tipo_credito,
            creditos.status,
            fecha_aprobacion,
            creditos.tiempo,
            creditos.interes,
            nombres AS cliente_nombre,
            negocios.nombre_negocio AS cliente_negocio,
            clientes.telefonos AS cliente_telefono,
            tipos_creditos.descripcion,
            clientes.nombres AS cliente_nombres,
            clientes.app_pat AS cliente_app_pat,
            clientes.app_mat AS cliente_app_mat,
            negocios.tipo as tipo_negocio
            FROM creditos
            INNER JOIN clientes ON creditos.idcliente = clientes.idcliente
            INNER JOIN negocios ON creditos.idnegocio = negocios.idnegocio
            INNER JOIN tipos_creditos ON creditos.tipo_credito = tipos_creditos.idtipo
            WHERE creditos.status = 'P'
            `;
            connection.query(sql,(err,result)=>{
                if(!err){
                    res.status(200).send({result});
                }else return res.status(500).send({message:`Error al consultar en la BD: ${err}`});
            });        
        }else return res.status(500).send({message:`Error al conectar con la bd: ${err}`});
        connection.release();
    });
}


function nuevoCredito(req,res){
    // Al llegar un nuevo prestamo se genera 1 encuesta vacia 
    var data =  req.body;
    var sql='';
    console.log(data);
    // Valores que no pueden faltar: 
    if(!data.idcliente 
        || !data.idnegocio 
        || !data.idsucursal 
        || !data.idempresa 
        || !data.monto_solicitado
        || !data.empleado_captura 
        || !data.tipo_credito
        ) return res.status(403).send('ERROR!, No se enviaron todos los datos...');
    var fecha_actual= moment().format('YYYY-MM-DD'); 
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `SELECT * FROM tipos_creditos WHERE idtipo=${data.tipo_credito}`;
            connection.query(sql,(err,result)=>{
                if(!err){
                    console.log(result)
                    var tiempo, interes, monto_conInteres, monto_interes, status;
                    tiempo=result[0].tiempo;
                    interes=result[0].interes;
                    monto_interes=data.monto_solicitado*(interes/100);
                    monto_conInteres=parseFloat(data.monto_solicitado)+parseInt(monto_interes);
                    status='?';
                    //buscar datos del cliente:
                    connection.query(`SELECT * FROM clientes WHERE idcliente=${data.idcliente}`,(err,result,fields)=>{
                        if(err)  return res.status(500).send({message:`Error en la consulta ${err}`});
                        if(!err){
                            var nombre_cliente = `${result[0].nombres} ${result[0].app_pat} ${result[0].app_mat}`;
                            var telefono_cliente = result[0].telefono
                            sql='INSERT INTO creditos VALUES'+
                            `(null,${data.idcliente},${data.idnegocio},${data.idsucursal},${data.idempresa},'${fecha_actual}','${data.monto_solicitado}','${monto_interes}','${monto_conInteres}','${data.empleado_captura}','${data.tipo_credito}','?',null,'${tiempo}','${interes}',null,null)`;
                            connection.query(sql,(err,result)=>{
                                if(err) return res.status(500).send({message:`ERROR ocurrio un error al añadir al cliente ${err} ---> sql: ${sql}`});
                                if(!err ){
                                    console.log('Prestamo y guardado con exito');
                                    res.status(200).send({result:result});
                                }
                            });  
                        } else return res.status(500).send({message:`Error al consultar en la BD: ${err}`});
                    }); 
                }else return res.status(500).send({message:`Error al consultar en la BD: ${err}`});
            });        
        }else return res.status(500).send({message:`Error al conectar con la bd: ${err}`});
        connection.release();
    })
}

function editarTipo(req,res){
    // Al llegar un nuevo prestamo se genera 1 encuesta vacia 
    var data =  req.body;
    var sql='';
    console.log(data);
    // Valores que no pueden faltar: 
    if(!data.idcredito) return res.status(403).send('ERROR!, No se enviaron todos los datos...');
    var fecha_actual= moment().format('YYYY-MM-DD'); 
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `SELECT * FROM tipos_creditos WHERE idtipo=${data.tipo_credito}`;
            connection.query(sql,(err,result)=>{
                if(!err){
                    console.log(result)
                    var tiempo, interes, monto_conInteres, monto_interes, status;
                    tiempo=result[0].tiempo;
                    interes=result[0].interes;
                    monto_interes=data.monto_solicitado*(interes/100);
                    monto_conInteres=parseFloat(data.monto_solicitado)+parseInt(monto_interes);
                    status='?';
                    //buscar datos del cliente:
                    connection.query(`SELECT * FROM clientes WHERE idcliente=${data.idcliente}`,(err,result,fields)=>{
                        if(err)  return res.status(500).send({message:`Error en la consulta ${err}`});
                        if(!err){
                            var nombre_cliente = `${result[0].nombres} ${result[0].app_pat} ${result[0].app_mat}`;
                            var telefono_cliente = result[0].telefono
                            // sql='INSERT INTO creditos VALUES'+
                            // `(null,${data.idcliente},${data.idnegocio},${data.idsucursal},${data.idempresa},'${fecha_actual}','${data.monto_solicitado}','${monto_interes}','${monto_conInteres}','${data.empleado_captura}','${data.tipo_credito}','?',null,'${tiempo}','${interes}',null,null)`;
                            sql=`
                                UPDATE creditos SET 
                                monto_solicitado = '${data.monto_solicitado}',
                                monto_interes = '${monto_interes}',
                                monto_conInteres = '${monto_conInteres}',
                                tipo_credito = ${data.tipo_credito},
                                tiempo = '${tiempo}',
                                interes = '${interes}'
                                WHERE idcredito = ${data.idcredito}
                            `;
                            connection.query(sql,(err,result)=>{
                                if(err) return res.status(500).send({message:`ERROR ocurrio un error al añadir al cliente ${err} ---> sql: ${sql}`});
                                if(!err ){
                                    console.log('Prestamo y guardado con exito');
                                    res.status(200).send({result:result});
                                }
                            });  
                        } else return res.status(500).send({message:`Error al consultar en la BD: ${err}`});
                    }); 
                }else return res.status(500).send({message:`Error al consultar en la BD: ${err}`});
            });        
        }else return res.status(500).send({message:`Error al conectar con la bd: ${err}`});
        connection.release();
    })
}


function preaprobarRechazarCredito(req,res){
    if(!req.body.status || !req.body.monto_aprobado){ return res.status(403).send({message:`No se enviaron todos los datos`});}
    var idcredito = req.params.id;
    var status = req.body.status;
    var monto_aprobado = (status=='R') ?0 :req.body.monto_aprobado;
    var comentario = req.body.comentario;
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `UPDATE creditos SET status='${status}', monto_aprobado='${monto_aprobado}', comentario='${comentario}' WHERE idcredito=${idcredito}`;
            connection.query(sql,(err,result)=>{
                if(!err){
                    if(status=='A'){
                        res.status(200).send({result:`Prestamo preaprobado con exito`});
                    }else{
                        res.status(200).send({result:`Prestamo rechazado con exito`});
                    }
                }else res.status(500).send({message:`Error al consultar en la BD: ${err} , sql = ${sql}`});
            });   
                 
        }else res.status(500).send({message:`Error al conectar con la bd: ${err}`});
        connection.release();
    })
}

function AprobarRechazarCredito(req,res){
    if(!req.body.status){ return res.status(403).send({message:`No se enviaron todos los datos`});}
    var idcredito = req.params.id;
    var status = req.body.status;
    var comentario = req.body.comentario
    pool.getConnection((err,connection)=>{
        if(!err){
            var sql = `UPDATE creditos SET status='${status}', comentario='${comentario}' WHERE idcredito=${idcredito}`;
            connection.query(sql,(err,result)=>{
                if(!err){
                    if(status=='A'){
                        // se obtienen los datos del prestamo: 
                        sql=`SELECT * FROM creditos WHERE idcredito=${idcredito}`;
                        connection.query(sql,(err,result)=>{
                            console.log(result);
                            if(err)  res.status(500).send({message:`Error en la consulta ${err}`});
                            if(result.length < 1)  res.status(404).send({message:`No se encontraron clientes`});
                            if(!err && result.length > 0){
                                var idtipocredito = result[0].tipo_credito;
                                var tiempo = result[0].tiempo;
                                var idcliente = result[0].idcliente;
                                var idnegocio = result[0].idnegocio;
                                var empleado_captura = result[0].idempleado;
                                var interes=result[0].interes;
                                var monto_interes=result[0].monto_aprobado*(interes/100);
                                var monto_conInteres=parseFloat(result[0].monto_aprobado)+parseInt(monto_interes);
                                var cobro_unitario = monto_conInteres / parseInt(tiempo);
                                console.log('cobro unitario : ',cobro_unitario);
                                // obtenemos datos del tipo de credito:
                                sql = `SELECT * FROM tipos_creditos WHERE idtipo=${idtipocredito}`;
                                connection.query(sql,(err,result)=>{
                                    if(err)  res.status(500).send({message:`Error en la consulta ${err}`});
                                    if(result.length < 1)  res.status(404).send({message:`No se encontraron creditos`});
                                    if(!err && result.length > 0){
                                        console.log(result);
                                        var credito_tipo_credito = result[0].tipo;
                                        var sql =`SELECT * FROM negocios WHERE idnegocio=${idnegocio}`;
                                        connection.query(sql,(err,result)=>{
                                            if(!err){
                                                console.log(result);
                                                
                                                var cobrador = result[0].idempleado;
                                                var addMoment = '';
                                                switch(credito_tipo_credito) {
                                                case 'DIARIOS':
                                                    addMoment = 'days';
                                                    break;
                                                case 'SEMANALES':
                                                    addMoment = 'weeks';
                                                    break;
                                                case 'MENSUALES':
                                                    addMoment = 'months'
                                                    break;
                                                }
                                                var values = [];
                                                var fecha_moment  = moment().add(1,`${addMoment}`);
                                                for(var i=1; i <= tiempo ; i++ ){
                                                    values.push(['null',idcredito,idcliente,cobrador,fecha_moment.format('YYYY-MM-DD'),cobro_unitario,'null','null','Pendiente']);
                                                    fecha_moment  = moment().add(i+1,`${addMoment}`);
                                                }
                                                var cobros_sql = `INSERT INTO cobros (idcobro,idcredito,idcliente,idempleado,fecha_cobro,cantidad_cobro,comentario_cobro,imagen_cobro,status) VALUES ?`;
                                                
                                                connection.query(cobros_sql,[values],(err,result)=>{
                                                    if (err) console.log(`Error en la coneccion 3 ${err} --->sql = ${cobros_sql}`);
                                                    if(!err){
                                                        console.log("Number of records inserted: " + result.affectedRows);
                                                        console.log(`Los cobros se insertaran de la siguiente manera: ${cobros_sql}`);
                                                        sql =`UPDATE creditos SET fecha_aprobacion='${moment().format('YYYY-MM-DD')}', monto_interes='${monto_interes}', monto_conInteres='${monto_conInteres}' WHERE idcredito=${idcredito}`;
                                                        connection.query(sql,(err,result)=>{
                                                            if(!err){
                                                                console.log('si salio papu');
                                                                res.status(200).send({result});
                                                            }else res.status(500).send({message:`Error al actualizar papu ${err}`});
                                                            
                                                        });
                                                    }  
                                                });
                                              
                                            }else res.status(500).send({message:`Error al actualizar papu ${err}`});
                                        });
                                    }
                                }); 
                            }
                        });
                    }else{
                        res.status(200).send({result:`Prestamo rechazado con exito`});
                    }
                }else res.status(500).send({message:`Error al consultar en la BD: ${err} , sql = ${sql}`});
            });   
                 
        }else res.status(500).send({message:`Error al conectar con la bd: ${err}`});
        connection.release();
    })
}

module.exports={
    getCreditos,
    getCreditosSinAprobar,
    preaprobarRechazarCredito,
    AprobarRechazarCredito,
    nuevoCredito,
    getFinales,
    editarTipo
}