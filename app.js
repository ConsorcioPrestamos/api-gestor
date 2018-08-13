'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const morgan  = require('morgan');
var cloudinary = require('cloudinary');
var addHeaders = require('./middlewares/add_headers');


// Configuraciones de Cloudinary
cloudinary.config({
    cloud_name: "doxrlcgtc",
    api_key: "987472538786775",
    api_secret: "5eeR5ALC0UXmjJ1koaFZ_BOs2b4"
});

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //para enterder los datos que envian los clientes en formato json
app.use(morgan('dev')); //que utilice morgan en su configuracion de desarrollo
app.use(addHeaders); //Añadimos cabeceras necesarias para angular

//Delaraciones de rutas:
var empresasRoutes = require('./routes/empresas');
var empleadosRoutes = require('./routes/empleados');
var usuariosRoutes = require('./routes/usuarios');
var sucursalesRoutes = require('./routes/sucursales');
var redesSocialesRoutes = require('./routes/redesSociales');
var zonasRoutes = require('./routes/zonas');
var tiposCreditoRoutes = require('./routes/tiposCredito');
var clientesRoutes = require('./routes/clientes');
var negociosRoutes = require('./routes/negocios');
var investigacionesRoutes = require('./routes/investigaciones');
var prestamosRoutes = require('./routes/prestamos');
var cobrosRoutes = require('./routes/cobros');
var imagenesRoutes = require('./routes/imagenes');

//Middlewares de rutas:
app.use('/empresas',empresasRoutes);
app.use('/empleados/',empleadosRoutes);
app.use('/usuarios/',usuariosRoutes);
app.use('/sucursales', sucursalesRoutes);
app.use('/redes', redesSocialesRoutes);
app.use('/zonas', zonasRoutes);
app.use('/tiposCreditos', tiposCreditoRoutes);
app.use('/clientes', clientesRoutes);
app.use('/negocios', negociosRoutes);
app.use('/investigaciones', investigacionesRoutes);
app.use('/prestamos', prestamosRoutes);
app.use('/cobros', cobrosRoutes);
app.use('/imagenes', imagenesRoutes);


//pagina sin ruta//
app.get('/',(req,res)=>{
    res.status(200).send({message:'No accediste a ninguna opcion prueba con la url http://......../empleados/get'});
});

module.exports = app;