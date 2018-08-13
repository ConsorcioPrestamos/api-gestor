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
						res.status(200).send(result);
					}else res.status(500).send({message:`Error, al guardar en la base de datos`});
					connection.destroy();
				});
			}else res.status(500).send({message:`Error, al subir imagen ine a cloudinary: ${err}`})
		});
	}else res.status(500).send({message:'Error, no se envio ningun archivo'});
}

module.exports = { 
	uploadImage
}