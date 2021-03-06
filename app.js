'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const morgan  = require('morgan');
var cloudinary = require('cloudinary');
var addHeaders = require('./middlewares/add_headers');
const mysqldump = require('mysqldump');
const moment = require('moment');

const fechaActual = moment().format('YYYY-MM-DD');

mysqldump({
    connection: {
        host: "sql149.main-hosting.eu",
        user: "u262589863_prest", 
        password: "6LMHbFbNo", 
        database: "u262589863_prest"
    },
    dumpToFile: `./respaldosbd/${fechaActual}.sql`,
})

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
var tiposCreditoRoutes = require('./routes/tiposCredito');
var clientesRoutes = require('./routes/clientes');
var negociosRoutes = require('./routes/negocios');
var investigacionesRoutes = require('./routes/investigaciones');
var creditosRoutes = require('./routes/creditos');
var cobrosRoutes = require('./routes/cobros');
var imagenesRoutes = require('./routes/imagenes');
var asignacionLocalidades = require('./routes/asignacionLocalidad');

//Middlewares de rutas:
app.use('/empresas',empresasRoutes);
app.use('/empleados',empleadosRoutes);
app.use('/usuarios',usuariosRoutes);
app.use('/sucursales', sucursalesRoutes);
app.use('/redes', redesSocialesRoutes);
app.use('/tiposCreditos', tiposCreditoRoutes);
app.use('/clientes', clientesRoutes);
app.use('/negocios', negociosRoutes);
app.use('/investigaciones', investigacionesRoutes);
app.use('/creditos', creditosRoutes);
app.use('/cobros', cobrosRoutes);
app.use('/imagenes', imagenesRoutes);
app.use('/asignaciones',asignacionLocalidades);


//pagina sin ruta//
app.get('/',(req,res)=>{
    res.status(200).send({message:'No accediste a ninguna opcion prueba con la url http://......../empleados/get'});
});

module.exports = app;