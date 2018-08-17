const moment = require('moment');
const config = require('../config');
const dbConnection = config.connection;
const cloudinary = require('cloudinary');

var mysql = require('mysql');
var pool = config.pool;



function uploadImage(req, res) {
	// El archivo se manda con el nombre image
	console.log(req.files)
	var data = req.params; //idpadre, tipo
	if (!data.idpadre || !data.tipo) return res.status(500).send('no se enviaron todos los datos');
	if (req.files) {
		console.log('Llego un archivo al servidor');
		console.log(req.files.image);
		var ruta_temporal = req.files.image.path; //el campo que enviamos se llama image
		cloudinary.v2.uploader.upload(ruta_temporal, (err, result) => {
			if (!err) {
				var url = result.url;
				var public_id = result.public_id
				var sql = `INSERT imagenes VALUES(null,${data.idpadre},'${public_id}','${data.tipo.toUpperCase()}','${url}') `;
				var connection = dbConnection();
				connection.query(sql, (err, result) => {
					if (!err) {
						console.log(`Imagen guardada con exito`);
						res.status(200).send({ result });
					} else res.status(500).send({ message: `Error, al guardar en la base de datos` });
					connection.destroy();
				});
			} else res.status(500).send({ message: `Error, al subir imagen ine a cloudinary: ${err}` })
		});
	} else res.status(500).send({ message: 'Error, no se envio ningun archivo' });
}

function getImagenes(req, res) {
	pool.getConnection((err, connection) => {
		if (!err) {
			var sql = `SELECT * FROM imagenes`;
			connection.query(sql, (err, result) => {
				if (!err) {
					res.status(200).send({ result });
				} else res.status(500).send({ message: `Error, al consultar en la base de datos` });
			});
		} else res.status(500).send({ message: `Error, al conecatr con la base de datos` });
		connection.release();
	})
}

function imagenesNuevoCliente(req, res) {
	var idcliente = req.params.idCliente;
	var idnegocio = req.params.idNegocio;
	console.log(`Id del cliente: ${idcliente}, id del negocio ${idnegocio}`);
	
	if (req.files) {
		console.log(req.files);
		pool.getConnection((err, connection) => {
			var flagIne = 0;
			var flagDomicilio = 0;
			var flagContrato = 0;
			var flagNegocio = 0;
			if (!err) {
				if (flagIne == 0 || flagContrato == 0 || flagDomicilio == 0 || flagNegocio==0) {
					if (req.files.INE) { //valida si hay imagen ine y la guarda
						console.log('INE: ', req.files.INE);
						var ruta_temporal = req.files.INE.path;
						cloudinary.v2.uploader.upload(ruta_temporal, (err, result) => {
							if (!err) {
								var url = result.url;
								var public_id = result.public_id
								var sql = `INSERT imagenes VALUES(null,${idcliente},'${public_id}','INE','${url}') `;
								connection.query(sql,(err,result)=>{
									if(!err){
										console.log(result);
										flagIne = 1;
									}
									if(err) return res.status(500).send({ message: `Error al guardar imagen ine en bd ${err}` });
								});
							} else return res.status(500).send({ message: `Error al guardar imagen ine en cloudinary ${err}` });
						});
					}else{ flagIne = 1; } //termina subir imagen ine
					if(req.files.DOMICILIO) { //valida si hay imagen de domicilio y la sube
						console.log('DOMICILIO: ', req.files.DOMICILIO);
						var ruta_temporal = req.files.DOMICILIO.path;
						cloudinary.v2.uploader.upload(ruta_temporal, (err, result) => {
							if (!err) {
								var url = result.url;
								var public_id = result.public_id
								var sql = `INSERT imagenes VALUES(null,${idcliente},'${public_id}','DOMICILIO','${url}') `;
								connection.query(sql,(err,result)=>{
									if(!err){ 
										console.log(result);
										flagDomicilio = 1;
									}
									if(err) return res.status(500).send({ message: `Error al guardar imagen domicilio en bd ${err}` });
								});
							} else return res.status(500).send({ message: `Error al guardar imagen domicilio en cloudinary ${err}` });
						});
					}else{ flagDomicilio = 1; } // termina de subir imagen de domicilio
					if (req.files.CONTRATO) { //valida si hay imagen del contrato y la sube
						console.log('CONTRATO: ', req.files.CONTRATO);
						var ruta_temporal = req.files.CONTRATO.path;
						cloudinary.v2.uploader.upload(ruta_temporal, (err, result) => {
							if (!err) {
								var url = result.url;
								var public_id = result.public_id
								var sql = `INSERT imagenes VALUES(null,${idnegocio},'${public_id}','CONTRATO','${url}') `;
								connection.query(sql,(err,result)=>{
									if(!err){
										console.log(result);
										flagContrato = 1;
									}
									if(err) return res.status(500).send({ message: `Error al guardar imagen contrato en bd ${err}` });
								});
							} else return res.status(500).send({ message: `Error al guardar imagen contrato en cloudinary ${err}` });
						});
					}else{ flagContrato = 1; }
					for (let i = 0; i <= 5; i++) {
						if (req.files[i] && i<5) {
							console.log('NEGOCIOS: ######## ');
							var ruta_temporal = req.files[i].path;
							console.log(req.files[i]);
							cloudinary.v2.uploader.upload(ruta_temporal, (err, result) => {
								if (!err) {
									var url = result.url;
									var public_id = result.public_id
									var sql = `INSERT imagenes VALUES(null,${idnegocio},'${public_id}','NEGOCIOS','${url}') `;
									connection.query(sql,(err,result)=>{
										if(!err) console.log(result);
										if(err) return res.status(500).send({ message: `Error al guardar negocios contrato en bd ${err}` });
									});
								} else return res.status(500).send({ message: `Error al guardar imagen negocios en cloudinary ${err}` });
							});
						}else{
							flagNegocio = 1;
						}
					}
					if(flagIne==1 && flagDomicilio==1 && flagContrato==1 && flagNegocio==1 ){
						res.status(200).send({result:'Datos guardados'});
					}
				}

			} else return res.status(500).send({ message: `Error al conectar con la base de datos:${err}` });
			connection.release();
		});
	} else return res.status(500).send(`Error, no se mandaron ficheros`);
}

module.exports = {
	uploadImage,
	getImagenes,
	imagenesNuevoCliente
}