const moment = require('moment');
const config = require('../config');
const dbConnection = config.connection;
const cloudinary = require('cloudinary');

var mysql = require('mysql');
var pool  = config.pool;



function uploadImage(req,res){
	// El archivo se manda con el nombre image
	console.log(req.files)
	var data = req.params; //idpadre, tipo
	if(!data.idpadre || !data.tipo) return res.status(500).send('no se enviaron todos los datos');
	if(req.files){
		console.log('Llego un archivo al servidor');
		console.log(req.files.image);
		var ruta_temporal = req.files.image.path; //el campo que enviamos se llama image
        cloudinary.v2.uploader.upload(ruta_temporal,(err,result)=>{
			if(!err){
				var url = result.url; 
				var public_id = result.public_id
				var sql = `INSERT imagenes VALUES(null,${data.idpadre},'${public_id}','${data.tipo.toUpperCase()}','${url}') `;
				var connection = dbConnection();
				connection.query(sql,(err,result)=>{
					if(!err){
						console.log(`Imagen guardada con exito`);
						res.status(200).send({result});
					}else res.status(500).send({message:`Error, al guardar en la base de datos`});
					connection.destroy();
				});
			}else res.status(500).send({message:`Error, al subir imagen ine a cloudinary: ${err}`})
		});
	}else res.status(500).send({message:'Error, no se envio ningun archivo'});
}

function clienteNuevoImages(req,res){
	//tipo: INE,DOMICILIO,NEGOCIO,CONTRATO
	if(req.files){
		var files= req.files;
		var idCliente=req.params.idCliente;
		var idNegocio=req.params.idNegocio;
		console.log(files);
		if(files.INE && files.DOMICILIO){
			console.log('empezando a subir imagen ine y domicilio');
			var INE_temporal = req.files.INE.path; 
			var DOMICILIO_temporal = req.files.DOMICILIO.path; 
			cloudinary.v2.uploader.upload(INE_temporal,(err,result)=>{
				if(!err){
					console.log('imagen ine  en cloudynary');
					var INEurl = result.url,  INEpublic_id = result.public_id
					cloudinary.v2.uploader.upload(DOMICILIO_temporal,(err,result)=>{
						if(!err){
							console.log('imagen domicilio  en cloudynary');
							var DOMICILIOurl = result.url,  DOMICILIOpublic_id = result.public_id
							//genero la data para los insert
							var data = [
								['null', idCliente, INEpublic_id, 'INE',INEurl],
								['null', idNegocio, DOMICILIOpublic_id, 'DOMICILIO',DOMICILIOurl]
							]
							var sql = `INSERT INTO imagenes VALUES ?`;
							pool.getConnection((err,connection)=>{
								connection.query(sql,[data],(err,result)=>{
									if(!err){
										console.log('imagen domicilio  e ine en bd');
										console.log(`Imagen guardada con exito`);
										if(req.files.CONTRATO){
											console.log('empezando a subir contrato');
											var CONTRATO_temporal = files.CONTRATO.path;
											cloudinary.v2.uploader.upload(CONTRATO_temporal,(err,result)=>{
												if(!err){
													console.log('imagen contrato en cloudinary');
													var CONTRATOurl= result.url, CONTRATOpublic_id= result.public_id
													sql = `INSERT INTO imagenes VALUES(null, ${idNegocio}, '${CONTRATOpublic_id}', 'CONTRATO' ,'${CONTRATOurl}')`;
													connection.query(sql,(err,result)=>{
														if(!err){
															console.log('imagen contrato en bd');
															// if(files.NEGOCIO){
															// 	console.log('empezando a subir imagenes negocio');
															// 	var dataNegocio=[];
															// 	console.log(req.files.NEGOCIO.length);
															// 	for(var i = 0; i< files.NEGOCIO.length; i++){
															// 		var NEGOCIO_temporal = files.NEGOCIO[i].path;
															// 		cloudinary.v2.uploader.upload(NEGOCIO_temporal,(err,result)=>{
															// 			if(!err){
															// 				var NEGOCIOurl= result.url, NEGOCIOpublic_id= result.public_id
															// 				dataNegocio.push([null, idNegocio, NEGOCIOpublic_id, 'NEGOCIO' , NEGOCIOurl]);
															// 				if(i == (files.NEGOCIO.length-1) ){
															// 					//ya va en el ultimo
															// 					var sql = `INSERT INTO imagenes VALUES ?`; 
															// 					connection.query(sql,[dataNegocio],(err,result)=>{
															// 						if(!err){
															// 							res.status(200).send({result});
															// 						}else return res.status(500).send({message:`Error, al subir imagen las imagenes a cloudinary: ${err}`})
															// 					})
															// 				}
															// 			}else return res.status(500).send({message:`Error, al subir imagen ine a cloudinary: ${err}`})
															// 		});
															// 	}
															// }else{
															// 	return res.status(200).send({result});
															// }
														}else return res.status(500).send({message:`Error, al subir imagen ine a cloudinary: ${err}`})
													})
												}else return res.status(500).send({message:`Error, al subir imagen ine a cloudinary: ${err}`})
											});
										}
										if(files.NEGOCIO){
											var dataNegocio=[];
											for(var i = 0; i< files.NEGOCIO.length; i++){
												var NEGOCIO_temporal = files.NEGOCIO.path;
												cloudinary.v2.uploader.upload(NEGOCIO_temporal,(err,result)=>{
													if(!err){
														var NEGOCIOurl= result.url, NEGOCIOpublic_id= result.public_id
														dataNegocio.push([null, idNegocio, NEGOCIOpublic_id, 'NEGOCIO' , NEGOCIOurl]);
														if(i == (files.NEGOCIO.length-1) ){
															//ya va en el ultimo
															var sql = `INSERT INTO imagenes VALUES ?`; 
															connection.query(sql,[dataNegocio],(err,result)=>{
																if(!err){
																	if(req.files.CONTRATO){
																		var CONTRATO_temporal = files.CONTRATO.path;
																		cloudinary.v2.uploader.upload(CONTRATO_temporal,(err,result)=>{
																			if(!err){
																				var CONTRATOurl= result.url, CONTRATOpublic_id= result.public_id
																				sql = `INSERT INTO imagenes VALUES(null, ${idNegocio}, '${CONTRATOpublic_id}', 'CONTRATO' ,'${CONTRATOurl}')`;
																				connection.query(sql,(err,result)=>{
																					res.status(200).send({result});
																				})
																			}else return res.status(500).send({message:`Error, al subir imagen ine a cloudinary: ${err}`})
																		});
																	}else{
																		return res.status(200).send({result});
																	}
																}else return res.status(500).send({message:`Error, al subir imagen las imagenes a cloudinary: ${err}`})
															})
														}
													}else return res.status(500).send({message:`Error, al subir imagen ine a cloudinary: ${err}`})
												});
											}
										}
										if(!req.files.CONTRATO && !req.files.NEGOCIO || req.files.NEGOCIO.length < 1){
											return res.status(200).send({result});
										}
									}else return res.status(500).send({message:`Error, al guardar en la base de datos`});
									connection.release();
								});
							})
						}else return res.status(500).send({message:`Error, al subir imagen ine a cloudinary: ${err}`});
					});
				}else return res.status(500).send({message:`Error, al subir imagen ine a cloudinary: ${err}`});
			});
		}
	}else return res.status(500).send({message:'No se enviaron archivos'});
	
}

function getImagenes(req,res){
	pool.getConnection((err,connection)=>{
		if(!err){
			var sql = `SELECT * FROM imagenes`;
			connection.query(sql,(err,result)=>{
				if(!err){
					res.status(200).send({result});
				}else res.status(500).send({message:`Error, al consultar en la base de datos`});
			});
		}else res.status(500).send({message:`Error, al conecatr con la base de datos`});
		connection.release();
	})
}
module.exports = { 
	uploadImage,
	getImagenes,
	clienteNuevoImages
}