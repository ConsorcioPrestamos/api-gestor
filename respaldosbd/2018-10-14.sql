/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: asignaciones_localidades
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `asignaciones_localidades` (
  `idasignacion` int(11) NOT NULL AUTO_INCREMENT,
  `idempleado` int(11) NOT NULL,
  `localidad` varchar(999) COLLATE utf8_unicode_ci NOT NULL,
  `fecha` varchar(99) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`idasignacion`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: clientes
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `clientes` (
  `idcliente` int(11) NOT NULL AUTO_INCREMENT,
  `nombres` varchar(99) COLLATE utf8_unicode_ci NOT NULL,
  `app_pat` varchar(99) COLLATE utf8_unicode_ci NOT NULL,
  `app_mat` varchar(99) COLLATE utf8_unicode_ci NOT NULL,
  `telefonos` varchar(99) COLLATE utf8_unicode_ci NOT NULL,
  `status` varchar(99) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`idcliente`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: cobros
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `cobros` (
  `idcobro` int(11) NOT NULL AUTO_INCREMENT,
  `idcredito` int(11) DEFAULT NULL,
  `idcliente` int(11) DEFAULT NULL,
  `idempleado` int(11) DEFAULT NULL,
  `fecha_cobro` varchar(99) DEFAULT NULL,
  `cantidad_cobro` double DEFAULT NULL,
  `comentario_cobro` varchar(255) DEFAULT NULL,
  `imagen_cobro` varchar(255) DEFAULT NULL,
  `status` varchar(99) NOT NULL,
  PRIMARY KEY (`idcobro`)
) ENGINE = InnoDB AUTO_INCREMENT = 61 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: creditos
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `creditos` (
  `idcredito` int(11) NOT NULL AUTO_INCREMENT,
  `idcliente` int(11) DEFAULT NULL,
  `idnegocio` int(11) DEFAULT NULL,
  `idsucursal` int(11) DEFAULT NULL,
  `idempresa` int(11) NOT NULL,
  `fecha_solicitud` varchar(999) DEFAULT NULL,
  `monto_solicitado` float(255, 0) DEFAULT NULL,
  `monto_interes` float(11, 0) DEFAULT NULL,
  `monto_conInteres` float(255, 0) DEFAULT NULL,
  `empleado_captura` int(11) DEFAULT NULL,
  `tipo_credito` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `fecha_aprobacion` varchar(99) DEFAULT NULL,
  `tiempo` double DEFAULT NULL COMMENT 'se ira descontando 1 dia con cada pago',
  `interes` double DEFAULT NULL,
  `monto_aprobado` varchar(999) DEFAULT NULL,
  `comentario` varchar(9999) DEFAULT NULL,
  PRIMARY KEY (`idcredito`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: empleados
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `empleados` (
  `idempleado` int(11) NOT NULL AUTO_INCREMENT,
  `idsucursal` int(11) DEFAULT NULL,
  `fecha_alta` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL,
  `nombres` varchar(999) COLLATE utf8_unicode_ci DEFAULT NULL,
  `app_pat` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL,
  `app_mat` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL,
  `callenum` varchar(999) COLLATE utf8_unicode_ci DEFAULT NULL,
  `colonia` varchar(999) COLLATE utf8_unicode_ci DEFAULT NULL,
  `estado` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL,
  `municipio` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL,
  `poblacion` varchar(999) COLLATE utf8_unicode_ci DEFAULT NULL,
  `telefonos` varchar(999) COLLATE utf8_unicode_ci DEFAULT NULL,
  `nss` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL,
  `puesto` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Puede ser SUPERVISOR, CAPTURISTA, COBRADOR ',
  `derecho_esp` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Permisos de todas las empresas en la sucursal',
  `status` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idempleado`)
) ENGINE = InnoDB AUTO_INCREMENT = 1000000016 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: empresas
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `empresas` (
  `idempresa` int(11) NOT NULL AUTO_INCREMENT,
  `razon_social` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `rfc` varchar(99) DEFAULT NULL,
  PRIMARY KEY (`idempresa`)
) ENGINE = InnoDB AUTO_INCREMENT = 8 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: giros
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `giros` (
  `idgiro` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idgiro`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: imagenes
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `imagenes` (
  `idimagen` int(11) NOT NULL AUTO_INCREMENT,
  `idpadre` int(11) NOT NULL COMMENT 'Hace referencia al id del negocio/cliente al que pertenece la imagen',
  `public_id` varchar(99) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Hace referencia al public_id de cloudinary',
  `tipo` varchar(99) COLLATE utf8_unicode_ci NOT NULL COMMENT 'CONTRATO,INE,NEGOCIO,DOMICILIO,ATRASO',
  `url` varchar(99) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`idimagen`)
) ENGINE = InnoDB AUTO_INCREMENT = 46 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: investigaciones
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `investigaciones` (
  `idinvestigacion` int(11) NOT NULL AUTO_INCREMENT,
  `idcliente` int(11) NOT NULL,
  `idnegocio` int(11) NOT NULL,
  `fecha_nacimiento` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL,
  `edad` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `edo_civil` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'hace referencia al estado civil, puede ser, casado, soltero, etc',
  `calle` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL,
  `num_ext` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL,
  `num_int` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL,
  `colonia` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL,
  `municipio` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL,
  `estado` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL,
  `poblacion` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tel` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL,
  `casa_propia` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL,
  `num_dependientes` int(11) DEFAULT NULL,
  `monto_credito` int(11) DEFAULT NULL,
  `tipo_comprobante` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'puede ser luz,agua, telefono, etc',
  `calle_negocio` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL,
  `num_ext_negocio` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL,
  `num_int_negocio` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL,
  `colonia_negocio` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL,
  `municipio_negocio` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL,
  `estado_negocio` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL,
  `poblacion_negocio` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL,
  `horario` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'ejemplo: 8:00-15:00',
  `nombre_aval` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tiempo_aval` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'tiempo de conocerse',
  `tel_aval` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'telefono',
  `nombre_fam` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL,
  `parentezco` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'primo,hermano,suegro, etc',
  `tel_fam` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL,
  `como_supo` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'volante, recomendacion,etc',
  `especificar` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `fecha` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'fecha en que se llevo acabo',
  `comentarios_capturista` varchar(9999) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'pendiente o realizada',
  PRIMARY KEY (`idinvestigacion`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: negocios
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `negocios` (
  `idnegocio` int(11) NOT NULL AUTO_INCREMENT,
  `idcliente` int(11) NOT NULL,
  `nombre_negocio` varchar(99) COLLATE utf8_unicode_ci NOT NULL,
  `giro` varchar(99) COLLATE utf8_unicode_ci NOT NULL COMMENT 'descripcion de los giros del negocio',
  `tipo` varchar(99) COLLATE utf8_unicode_ci NOT NULL COMMENT 'ambulante, negocio en casa, local fijo',
  `comentarios` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `ubicacion` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `propietario` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `antiguedad` varchar(999) COLLATE utf8_unicode_ci NOT NULL,
  `arrendamiento` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`idnegocio`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: redes_sociales
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `redes_sociales` (
  `idred` int(11) NOT NULL AUTO_INCREMENT,
  `idsucursal` int(11) NOT NULL,
  `nombre_red` varchar(99) COLLATE utf8_unicode_ci NOT NULL COMMENT 'especifica a que red social pertenece la tupla; Facebook, twitter, instagram, email, whatsapp',
  `url` varchar(999) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`idred`)
) ENGINE = InnoDB AUTO_INCREMENT = 15 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: sucursales
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `sucursales` (
  `idsucursal` int(11) NOT NULL AUTO_INCREMENT,
  `idencargado` int(11) DEFAULT NULL,
  `nombre` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL,
  `telefono` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL,
  `hora_inicio` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `hora_fin` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `callenum` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL,
  `colonia` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL,
  `poblacion` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL,
  `municipio` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL,
  `estado` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL,
  `cp` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idsucursal`)
) ENGINE = InnoDB AUTO_INCREMENT = 10 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tipos_creditos
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tipos_creditos` (
  `idtipo` int(11) NOT NULL AUTO_INCREMENT,
  `idempresa` int(11) NOT NULL,
  `descripcion` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `tipo` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'diario, semanal , mensual',
  `tiempo` int(11) NOT NULL COMMENT 'hace referencia al numero de dias, semanas, o meses que dura el credito',
  `interes` float NOT NULL,
  `status` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`idtipo`)
) ENGINE = InnoDB AUTO_INCREMENT = 10 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: usuarios
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `usuarios` (
  `idusuario` int(11) NOT NULL AUTO_INCREMENT,
  `idempleado` int(11) DEFAULT NULL,
  `usuario` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(99) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idusuario`)
) ENGINE = InnoDB AUTO_INCREMENT = 1000000016 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: asignaciones_localidades
# ------------------------------------------------------------

INSERT INTO
  `asignaciones_localidades` (`idasignacion`, `idempleado`, `localidad`, `fecha`)
VALUES
  (1, 1000000009, 'LOS MOCHIS', '2018-09-14');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: clientes
# ------------------------------------------------------------

INSERT INTO
  `clientes` (
    `idcliente`,
    `nombres`,
    `app_pat`,
    `app_mat`,
    `telefonos`,
    `status`
  )
VALUES
  (
    1,
    'ANA MARIA',
    'H',
    'R',
    '(123)198-2739,(987)342-9384',
    'ACTIVO'
  );
INSERT INTO
  `clientes` (
    `idcliente`,
    `nombres`,
    `app_pat`,
    `app_mat`,
    `telefonos`,
    `status`
  )
VALUES
  (
    2,
    'MARIA',
    'RODRIGUEZ',
    'APODACA',
    '(342)343-2423,(234)234-2342',
    'ACTIVO'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: cobros
# ------------------------------------------------------------

INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    1,
    1,
    1,
    NULL,
    '2018-10-11',
    86.66666666666667,
    'null',
    'null',
    'Pagado'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    2,
    1,
    1,
    NULL,
    '2018-10-11',
    86.66666666666667,
    'null',
    'null',
    'Pagado'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    3,
    1,
    1,
    NULL,
    '2018-10-11',
    86.66666666666667,
    'null',
    'null',
    'Pagado'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    4,
    1,
    1,
    NULL,
    '2018-10-11',
    86.66666666666667,
    'null',
    'null',
    'Pagado'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    5,
    1,
    1,
    NULL,
    '2018-10-11',
    86.66666666666667,
    'null',
    'null',
    'Pagado'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    6,
    1,
    1,
    NULL,
    '2018-10-11',
    86.66666666666667,
    'null',
    'null',
    'Pagado'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    7,
    1,
    1,
    NULL,
    '2018-10-11',
    86.66666666666667,
    'null',
    'null',
    'Pagado'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    8,
    1,
    1,
    NULL,
    '2018-10-11',
    86.66666666666667,
    'null',
    'null',
    'Pagado'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    9,
    1,
    1,
    NULL,
    '2018-10-11',
    86.66666666666667,
    'null',
    'null',
    'Pagado'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    10,
    1,
    1,
    NULL,
    '2018-10-11',
    86.66666666666667,
    'null',
    'null',
    'Pagado'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    11,
    1,
    1,
    NULL,
    '2018-10-11',
    86.66666666666667,
    'null',
    'null',
    'Pagado'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    12,
    1,
    1,
    NULL,
    '2018-10-11',
    86.66666666666667,
    'null',
    'null',
    'Pagado'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    13,
    1,
    1,
    NULL,
    '2018-10-11',
    86.66666666666667,
    'null',
    'null',
    'Pagado'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    14,
    1,
    1,
    NULL,
    '2018-10-11',
    86.66666666666667,
    'null',
    'null',
    'Pagado'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    15,
    1,
    1,
    NULL,
    '2018-10-11',
    86.66666666666667,
    'null',
    'null',
    'Pagado'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    16,
    1,
    1,
    NULL,
    '2018-10-11',
    86.66666666666667,
    'null',
    'null',
    'Pagado'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    17,
    1,
    1,
    NULL,
    '2018-10-11',
    86.66666666666667,
    'null',
    'null',
    'Pagado'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    18,
    1,
    1,
    NULL,
    '2018-10-11',
    86.66666666666667,
    'null',
    'null',
    'Pagado'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    19,
    1,
    1,
    NULL,
    '2018-10-11',
    86.66666666666667,
    'null',
    'null',
    'Pagado'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    20,
    1,
    1,
    NULL,
    '2018-10-11',
    86.66666666666667,
    'null',
    'null',
    'Pagado'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    21,
    1,
    1,
    NULL,
    '2018-10-11',
    86.66666666666667,
    'null',
    'null',
    'Pagado'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    22,
    1,
    1,
    NULL,
    '2018-10-11',
    86.66666666666667,
    'null',
    'null',
    'Pagado'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    23,
    1,
    1,
    NULL,
    '2018-10-11',
    86.66666666666667,
    'null',
    'null',
    'Pagado'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    24,
    1,
    1,
    NULL,
    '2018-10-11',
    86.66666666666667,
    'null',
    'null',
    'Pagado'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    25,
    1,
    1,
    NULL,
    '2018-10-11',
    86.66666666666667,
    'null',
    'null',
    'Pagado'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    26,
    1,
    1,
    NULL,
    '2018-10-11',
    86.66666666666667,
    'null',
    'null',
    'Pagado'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    27,
    1,
    1,
    NULL,
    '2018-10-11',
    86.66666666666667,
    'null',
    'null',
    'Pagado'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    28,
    1,
    1,
    NULL,
    '2018-10-11',
    86.66666666666667,
    'null',
    'null',
    'Pagado'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    29,
    1,
    1,
    NULL,
    '2018-10-11',
    86.66666666666667,
    'null',
    'null',
    'Pagado'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    30,
    1,
    1,
    NULL,
    '2018-10-11',
    86.66666666666667,
    'null',
    'null',
    'Pagado'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    31,
    3,
    1,
    NULL,
    '2018-10-12',
    75.36666666666666,
    'null',
    'null',
    'Pendiente'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    32,
    3,
    1,
    NULL,
    '2018-10-13',
    75.36666666666666,
    'null',
    'null',
    'Pendiente'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    33,
    3,
    1,
    NULL,
    '2018-10-14',
    75.36666666666666,
    '<<<',
    'null',
    'Pagado'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    34,
    3,
    1,
    NULL,
    '2018-10-15',
    75.36666666666666,
    'null',
    'null',
    'Pendiente'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    35,
    3,
    1,
    NULL,
    '2018-10-16',
    75.36666666666666,
    'null',
    'null',
    'Pendiente'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    36,
    3,
    1,
    NULL,
    '2018-10-17',
    75.36666666666666,
    'null',
    'null',
    'Pendiente'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    37,
    3,
    1,
    NULL,
    '2018-10-18',
    75.36666666666666,
    'null',
    'null',
    'Pendiente'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    38,
    3,
    1,
    NULL,
    '2018-10-19',
    75.36666666666666,
    'null',
    'null',
    'Pendiente'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    39,
    3,
    1,
    NULL,
    '2018-10-20',
    75.36666666666666,
    'null',
    'null',
    'Pendiente'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    40,
    3,
    1,
    NULL,
    '2018-10-21',
    75.36666666666666,
    'null',
    'null',
    'Pendiente'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    41,
    3,
    1,
    NULL,
    '2018-10-22',
    75.36666666666666,
    'null',
    'null',
    'Pendiente'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    42,
    3,
    1,
    NULL,
    '2018-10-23',
    75.36666666666666,
    'null',
    'null',
    'Pendiente'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    43,
    3,
    1,
    NULL,
    '2018-10-24',
    75.36666666666666,
    'null',
    'null',
    'Pendiente'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    44,
    3,
    1,
    NULL,
    '2018-10-25',
    75.36666666666666,
    'null',
    'null',
    'Pendiente'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    45,
    3,
    1,
    NULL,
    '2018-10-26',
    75.36666666666666,
    'null',
    'null',
    'Pendiente'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    46,
    3,
    1,
    NULL,
    '2018-10-27',
    75.36666666666666,
    'null',
    'null',
    'Pendiente'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    47,
    3,
    1,
    NULL,
    '2018-10-28',
    75.36666666666666,
    'null',
    'null',
    'Pendiente'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    48,
    3,
    1,
    NULL,
    '2018-10-29',
    75.36666666666666,
    'null',
    'null',
    'Pendiente'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    49,
    3,
    1,
    NULL,
    '2018-10-30',
    75.36666666666666,
    'null',
    'null',
    'Pendiente'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    50,
    3,
    1,
    NULL,
    '2018-10-31',
    75.36666666666666,
    'null',
    'null',
    'Pendiente'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    51,
    3,
    1,
    NULL,
    '2018-11-01',
    75.36666666666666,
    'null',
    'null',
    'Pendiente'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    52,
    3,
    1,
    NULL,
    '2018-11-02',
    75.36666666666666,
    'null',
    'null',
    'Pendiente'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    53,
    3,
    1,
    NULL,
    '2018-11-03',
    75.36666666666666,
    'null',
    'null',
    'Pendiente'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    54,
    3,
    1,
    NULL,
    '2018-11-04',
    75.36666666666666,
    'null',
    'null',
    'Pendiente'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    55,
    3,
    1,
    NULL,
    '2018-11-05',
    75.36666666666666,
    'null',
    'null',
    'Pendiente'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    56,
    3,
    1,
    NULL,
    '2018-11-06',
    75.36666666666666,
    'null',
    'null',
    'Pendiente'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    57,
    3,
    1,
    NULL,
    '2018-11-07',
    75.36666666666666,
    'null',
    'null',
    'Pendiente'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    58,
    3,
    1,
    NULL,
    '2018-11-08',
    75.36666666666666,
    'null',
    'null',
    'Pendiente'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    59,
    3,
    1,
    NULL,
    '2018-11-09',
    75.36666666666666,
    'null',
    'null',
    'Pendiente'
  );
INSERT INTO
  `cobros` (
    `idcobro`,
    `idcredito`,
    `idcliente`,
    `idempleado`,
    `fecha_cobro`,
    `cantidad_cobro`,
    `comentario_cobro`,
    `imagen_cobro`,
    `status`
  )
VALUES
  (
    60,
    3,
    1,
    NULL,
    '2018-11-10',
    75.36666666666666,
    'null',
    'null',
    'Pendiente'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: creditos
# ------------------------------------------------------------

INSERT INTO
  `creditos` (
    `idcredito`,
    `idcliente`,
    `idnegocio`,
    `idsucursal`,
    `idempresa`,
    `fecha_solicitud`,
    `monto_solicitado`,
    `monto_interes`,
    `monto_conInteres`,
    `empleado_captura`,
    `tipo_credito`,
    `status`,
    `fecha_aprobacion`,
    `tiempo`,
    `interes`,
    `monto_aprobado`,
    `comentario`
  )
VALUES
  (
    1,
    1,
    1,
    8,
    7,
    '2018-10-10',
    2000,
    600,
    2600,
    1000000010,
    9,
    'RENOVADO',
    '2018-10-11',
    30,
    30,
    '2000',
    'NA'
  );
INSERT INTO
  `creditos` (
    `idcredito`,
    `idcliente`,
    `idnegocio`,
    `idsucursal`,
    `idempresa`,
    `fecha_solicitud`,
    `monto_solicitado`,
    `monto_interes`,
    `monto_conInteres`,
    `empleado_captura`,
    `tipo_credito`,
    `status`,
    `fecha_aprobacion`,
    `tiempo`,
    `interes`,
    `monto_aprobado`,
    `comentario`
  )
VALUES
  (
    2,
    2,
    2,
    8,
    6,
    '2018-10-10',
    12,
    1,
    13,
    1000000010,
    8,
    '?',
    NULL,
    8,
    10,
    NULL,
    NULL
  );
INSERT INTO
  `creditos` (
    `idcredito`,
    `idcliente`,
    `idnegocio`,
    `idsucursal`,
    `idempresa`,
    `fecha_solicitud`,
    `monto_solicitado`,
    `monto_interes`,
    `monto_conInteres`,
    `empleado_captura`,
    `tipo_credito`,
    `status`,
    `fecha_aprobacion`,
    `tiempo`,
    `interes`,
    `monto_aprobado`,
    `comentario`
  )
VALUES
  (
    3,
    1,
    1,
    8,
    7,
    '2018-10-11',
    2000,
    522,
    2261,
    0,
    9,
    'A',
    '2018-10-11',
    30,
    30,
    '1739.9999999999998',
    'NA'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: empleados
# ------------------------------------------------------------

INSERT INTO
  `empleados` (
    `idempleado`,
    `idsucursal`,
    `fecha_alta`,
    `nombres`,
    `app_pat`,
    `app_mat`,
    `callenum`,
    `colonia`,
    `estado`,
    `municipio`,
    `poblacion`,
    `telefonos`,
    `nss`,
    `puesto`,
    `derecho_esp`,
    `status`
  )
VALUES
  (
    999999999,
    50,
    '13-09-2018',
    'Super ',
    'Administrador',
    'Negocio',
    'Conocido',
    'Conocida',
    'NA',
    'NA',
    'NA',
    '(555)555-5555',
    '12345678909',
    'ADMINISTRADOR',
    'SI',
    'ACTIVO'
  );
INSERT INTO
  `empleados` (
    `idempleado`,
    `idsucursal`,
    `fecha_alta`,
    `nombres`,
    `app_pat`,
    `app_mat`,
    `callenum`,
    `colonia`,
    `estado`,
    `municipio`,
    `poblacion`,
    `telefonos`,
    `nss`,
    `puesto`,
    `derecho_esp`,
    `status`
  )
VALUES
  (
    1000000007,
    7,
    '2018-09-13',
    'JORGE LUIS',
    'LLAMAS',
    'ASTORGA',
    'CÓDIGO AGRARIO SN',
    'INFONAVIT MACAPULE',
    'SINALOA',
    'AHOME',
    'LOS MOCHIS',
    '(668)812-3123',
    '33423498987',
    'SUPERVISOR',
    'SI',
    'ACTIVO'
  );
INSERT INTO
  `empleados` (
    `idempleado`,
    `idsucursal`,
    `fecha_alta`,
    `nombres`,
    `app_pat`,
    `app_mat`,
    `callenum`,
    `colonia`,
    `estado`,
    `municipio`,
    `poblacion`,
    `telefonos`,
    `nss`,
    `puesto`,
    `derecho_esp`,
    `status`
  )
VALUES
  (
    1000000008,
    7,
    '2018-09-13',
    'ZAYRA YUNUEN',
    'COTA',
    'RANGEL',
    'MOCHIACAN 19',
    'ESTRELLA',
    'SINALOA',
    'AHOME',
    'LOS MOCHIS',
    '(668)123-1231',
    '76567567576',
    'CAPTURISTA',
    'NO',
    'ACTIVO'
  );
INSERT INTO
  `empleados` (
    `idempleado`,
    `idsucursal`,
    `fecha_alta`,
    `nombres`,
    `app_pat`,
    `app_mat`,
    `callenum`,
    `colonia`,
    `estado`,
    `municipio`,
    `poblacion`,
    `telefonos`,
    `nss`,
    `puesto`,
    `derecho_esp`,
    `status`
  )
VALUES
  (
    1000000009,
    7,
    '2018-09-13',
    'CLETO ISAAC',
    'LOPEZ',
    'RODRIGUEZ',
    'NAVOJOA 89',
    'YAQUI',
    'SINALOA',
    'AHOME',
    'LOS MOCHIS',
    '(668)887-2635',
    '87363737364',
    'COBRADOR',
    'SI',
    'ACTIVO'
  );
INSERT INTO
  `empleados` (
    `idempleado`,
    `idsucursal`,
    `fecha_alta`,
    `nombres`,
    `app_pat`,
    `app_mat`,
    `callenum`,
    `colonia`,
    `estado`,
    `municipio`,
    `poblacion`,
    `telefonos`,
    `nss`,
    `puesto`,
    `derecho_esp`,
    `status`
  )
VALUES
  (
    1000000010,
    8,
    '2018-09-13',
    'EMANUEL',
    'ANAYA',
    'ARMENTA',
    'EJ. TOSALIBAMPO 2',
    'EJIDO TOSALIBAMPO',
    'SINALOA',
    'AHOME',
    'EJIDO TOSALIBAMPO',
    '(668)121-2313',
    '77686786767',
    'COBRADOR',
    'SI',
    'ACTIVO'
  );
INSERT INTO
  `empleados` (
    `idempleado`,
    `idsucursal`,
    `fecha_alta`,
    `nombres`,
    `app_pat`,
    `app_mat`,
    `callenum`,
    `colonia`,
    `estado`,
    `municipio`,
    `poblacion`,
    `telefonos`,
    `nss`,
    `puesto`,
    `derecho_esp`,
    `status`
  )
VALUES
  (
    1000000011,
    8,
    '2018-09-13',
    'MIRSA PAOLO',
    'INZAUNZA',
    'MARTINEZ',
    'CONOCIDA SN',
    'BARRIO CENTRO',
    'SINALOA',
    'AHOME',
    'EL COLORADO',
    '(668)882-8282',
    '33423424243',
    'SUPERVISOR',
    'SI',
    'ACTIVO'
  );
INSERT INTO
  `empleados` (
    `idempleado`,
    `idsucursal`,
    `fecha_alta`,
    `nombres`,
    `app_pat`,
    `app_mat`,
    `callenum`,
    `colonia`,
    `estado`,
    `municipio`,
    `poblacion`,
    `telefonos`,
    `nss`,
    `puesto`,
    `derecho_esp`,
    `status`
  )
VALUES
  (
    1000000012,
    8,
    '2018-09-24',
    'LUIS',
    'GARCÍA',
    'ANGELES',
    'JÍCAMA 90',
    'VALLE DEL GUADALQUIVIR',
    'DISTRITO FEDERAL',
    'GUSTAVO A.MADERO',
    'GUSTAVO A. MADERO',
    '(556)546-0150',
    '12345678891',
    'SUPERVISOR',
    'SI',
    'ACTIVO'
  );
INSERT INTO
  `empleados` (
    `idempleado`,
    `idsucursal`,
    `fecha_alta`,
    `nombres`,
    `app_pat`,
    `app_mat`,
    `callenum`,
    `colonia`,
    `estado`,
    `municipio`,
    `poblacion`,
    `telefonos`,
    `nss`,
    `puesto`,
    `derecho_esp`,
    `status`
  )
VALUES
  (
    1000000013,
    9,
    '2018-09-28',
    'LUIS ANGEL',
    'ANGELES',
    'GARCÍA',
    'GUIRLANLA',
    'VALLE DE ARAGÓN',
    'DISTRITO FEDERAL',
    'ECATEPEC',
    'ECATEPEC',
    '(773)119-7808',
    '45677664544',
    'COBRADOR',
    'SI',
    'ACTIVO'
  );
INSERT INTO
  `empleados` (
    `idempleado`,
    `idsucursal`,
    `fecha_alta`,
    `nombres`,
    `app_pat`,
    `app_mat`,
    `callenum`,
    `colonia`,
    `estado`,
    `municipio`,
    `poblacion`,
    `telefonos`,
    `nss`,
    `puesto`,
    `derecho_esp`,
    `status`
  )
VALUES
  (
    1000000014,
    8,
    '2018-09-28',
    'LUIS ANGEL',
    'GARCIA',
    'ANGELES',
    'CHAMIZAL 45',
    'VALLE DE ARAGÓN',
    'DISTRITO FEDERAL',
    'ECATEPEC DE MORELOS',
    'ECATEPEC DE MORELOS',
    '(773)112-5080',
    '34567895432',
    'SUPERVISOR',
    'SI',
    'ACTIVO'
  );
INSERT INTO
  `empleados` (
    `idempleado`,
    `idsucursal`,
    `fecha_alta`,
    `nombres`,
    `app_pat`,
    `app_mat`,
    `callenum`,
    `colonia`,
    `estado`,
    `municipio`,
    `poblacion`,
    `telefonos`,
    `nss`,
    `puesto`,
    `derecho_esp`,
    `status`
  )
VALUES
  (
    1000000015,
    8,
    '2018-10-06',
    'JOSÉ LUIS',
    'GONZÁLEZ,',
    'GUISEL',
    'SIEMPREVIVA',
    'VALLE DE ARAGÓN',
    'DISTRITO FEDERAL',
    'ECATEPEC DE MORELOS',
    'ECATEPEC DE MORELOS',
    '(773)112-5080',
    '67754218967',
    'COBRADOR',
    'NO',
    'ACTIVO'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: empresas
# ------------------------------------------------------------

INSERT INTO
  `empresas` (
    `idempresa`,
    `razon_social`,
    `direccion`,
    `descripcion`,
    `rfc`
  )
VALUES
  (
    6,
    'CONSORCIO PRÉSTAMOS S,A. DE C.V.',
    'AV. REFORMA SN',
    'EMPRESA DEDICADA AL PRÉSTAMO DE EFECTIVO.',
    'COPR120383O10'
  );
INSERT INTO
  `empresas` (
    `idempresa`,
    `razon_social`,
    `direccion`,
    `descripcion`,
    `rfc`
  )
VALUES
  (
    7,
    'PRÉSTAMOS AL INSTANTE',
    'CONOCIDA',
    'PRÉSTAMOS AL INSTANTE',
    'PAIN981211U87'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: giros
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: imagenes
# ------------------------------------------------------------

INSERT INTO
  `imagenes` (`idimagen`, `idpadre`, `public_id`, `tipo`, `url`)
VALUES
  (
    2,
    2,
    'r1xwvl3ktm9xb2z2looe',
    'INE',
    'http://res.cloudinary.com/doxrlcgtc/image/upload/v1536914898/r1xwvl3ktm9xb2z2looe.png'
  );
INSERT INTO
  `imagenes` (`idimagen`, `idpadre`, `public_id`, `tipo`, `url`)
VALUES
  (
    3,
    2,
    'izhl6kudsyassuywchfo',
    'DOMICILIO',
    'http://res.cloudinary.com/doxrlcgtc/image/upload/v1536914898/izhl6kudsyassuywchfo.png'
  );
INSERT INTO
  `imagenes` (`idimagen`, `idpadre`, `public_id`, `tipo`, `url`)
VALUES
  (
    4,
    3,
    'pbc8nunttk4b10fvgtss',
    'DOMICILIO',
    'http://res.cloudinary.com/doxrlcgtc/image/upload/v1536965480/pbc8nunttk4b10fvgtss.jpg'
  );
INSERT INTO
  `imagenes` (`idimagen`, `idpadre`, `public_id`, `tipo`, `url`)
VALUES
  (
    5,
    3,
    'ble1bnutbetwugrqqwh7',
    'NEGOCIO',
    'http://res.cloudinary.com/doxrlcgtc/image/upload/v1536965480/ble1bnutbetwugrqqwh7.jpg'
  );
INSERT INTO
  `imagenes` (`idimagen`, `idpadre`, `public_id`, `tipo`, `url`)
VALUES
  (
    6,
    3,
    'hdcsol9qdfnlmealfdz7',
    'INE',
    'http://res.cloudinary.com/doxrlcgtc/image/upload/v1536965480/hdcsol9qdfnlmealfdz7.jpg'
  );
INSERT INTO
  `imagenes` (`idimagen`, `idpadre`, `public_id`, `tipo`, `url`)
VALUES
  (
    7,
    4,
    'sx8wcyfydc8y0zygzune',
    'NEGOCIO',
    'http://res.cloudinary.com/doxrlcgtc/image/upload/v1538083502/sx8wcyfydc8y0zygzune.jpg'
  );
INSERT INTO
  `imagenes` (`idimagen`, `idpadre`, `public_id`, `tipo`, `url`)
VALUES
  (
    8,
    4,
    'vi6lrgvpxhjlkymhjcrx',
    'DOMICILIO',
    'http://res.cloudinary.com/doxrlcgtc/image/upload/v1538083502/vi6lrgvpxhjlkymhjcrx.jpg'
  );
INSERT INTO
  `imagenes` (`idimagen`, `idpadre`, `public_id`, `tipo`, `url`)
VALUES
  (
    9,
    4,
    'npock9sjp6pqals7i48s',
    'INE',
    'http://res.cloudinary.com/doxrlcgtc/image/upload/v1538083502/npock9sjp6pqals7i48s.jpg'
  );
INSERT INTO
  `imagenes` (`idimagen`, `idpadre`, `public_id`, `tipo`, `url`)
VALUES
  (
    10,
    5,
    'go1tkdgy9yphtnqjefd5',
    'NEGOCIO',
    'http://res.cloudinary.com/doxrlcgtc/image/upload/v1538151432/go1tkdgy9yphtnqjefd5.jpg'
  );
INSERT INTO
  `imagenes` (`idimagen`, `idpadre`, `public_id`, `tipo`, `url`)
VALUES
  (
    11,
    5,
    'mbhcioadujw9aarowkxy',
    'INE',
    'http://res.cloudinary.com/doxrlcgtc/image/upload/v1538151432/mbhcioadujw9aarowkxy.jpg'
  );
INSERT INTO
  `imagenes` (`idimagen`, `idpadre`, `public_id`, `tipo`, `url`)
VALUES
  (
    12,
    5,
    'zdzodxgofsxyequf3lnd',
    'DOMICILIO',
    'http://res.cloudinary.com/doxrlcgtc/image/upload/v1538151432/zdzodxgofsxyequf3lnd.jpg'
  );
INSERT INTO
  `imagenes` (`idimagen`, `idpadre`, `public_id`, `tipo`, `url`)
VALUES
  (
    19,
    1000000007,
    'oqxfxibtet1dyivx56cx',
    'PERFIL',
    'http://res.cloudinary.com/doxrlcgtc/image/upload/v1538463093/oqxfxibtet1dyivx56cx.png'
  );
INSERT INTO
  `imagenes` (`idimagen`, `idpadre`, `public_id`, `tipo`, `url`)
VALUES
  (
    22,
    1000000010,
    'ac9l9ziccdvsxv4gkcqk',
    'PERFIL',
    'http://res.cloudinary.com/doxrlcgtc/image/upload/v1538340483/ac9l9ziccdvsxv4gkcqk.jpg'
  );
INSERT INTO
  `imagenes` (`idimagen`, `idpadre`, `public_id`, `tipo`, `url`)
VALUES
  (
    23,
    999999999,
    've9gzgomcbqb7m2gzflt',
    'PERFIL',
    'http://res.cloudinary.com/doxrlcgtc/image/upload/v1538462315/ve9gzgomcbqb7m2gzflt.jpg'
  );
INSERT INTO
  `imagenes` (`idimagen`, `idpadre`, `public_id`, `tipo`, `url`)
VALUES
  (
    24,
    7,
    'rnpdprhovvlfxbbocrkm',
    'INE',
    'http://res.cloudinary.com/doxrlcgtc/image/upload/v1538459905/rnpdprhovvlfxbbocrkm.png'
  );
INSERT INTO
  `imagenes` (`idimagen`, `idpadre`, `public_id`, `tipo`, `url`)
VALUES
  (
    25,
    7,
    'tocnzoloqauisug5gezx',
    'DOMICILIO',
    'http://res.cloudinary.com/doxrlcgtc/image/upload/v1538459905/tocnzoloqauisug5gezx.jpg'
  );
INSERT INTO
  `imagenes` (`idimagen`, `idpadre`, `public_id`, `tipo`, `url`)
VALUES
  (
    26,
    8,
    'aiamhpxzataxxyojcdaw',
    'INE',
    'http://res.cloudinary.com/doxrlcgtc/image/upload/v1538460361/aiamhpxzataxxyojcdaw.jpg'
  );
INSERT INTO
  `imagenes` (`idimagen`, `idpadre`, `public_id`, `tipo`, `url`)
VALUES
  (
    27,
    8,
    'jdoi33ny8jgwtzwyn7ty',
    'DOMICILIO',
    'http://res.cloudinary.com/doxrlcgtc/image/upload/v1538460361/jdoi33ny8jgwtzwyn7ty.jpg'
  );
INSERT INTO
  `imagenes` (`idimagen`, `idpadre`, `public_id`, `tipo`, `url`)
VALUES
  (
    28,
    1000000009,
    'qtyjfpseegqlxdykgomi',
    'PERFIL',
    'http://res.cloudinary.com/doxrlcgtc/image/upload/v1538462272/qtyjfpseegqlxdykgomi.jpg'
  );
INSERT INTO
  `imagenes` (`idimagen`, `idpadre`, `public_id`, `tipo`, `url`)
VALUES
  (
    29,
    9,
    'c97fmqvi5kqaq19inxmb',
    'DOMICILIO',
    'http://res.cloudinary.com/doxrlcgtc/image/upload/v1538586545/c97fmqvi5kqaq19inxmb.jpg'
  );
INSERT INTO
  `imagenes` (`idimagen`, `idpadre`, `public_id`, `tipo`, `url`)
VALUES
  (
    30,
    9,
    'zxssq2sfdg3kcwtmq7jc',
    'INE',
    'http://res.cloudinary.com/doxrlcgtc/image/upload/v1538586545/zxssq2sfdg3kcwtmq7jc.jpg'
  );
INSERT INTO
  `imagenes` (`idimagen`, `idpadre`, `public_id`, `tipo`, `url`)
VALUES
  (
    31,
    10,
    'vvpfkkzhbhyhujaxepz7',
    'INE',
    'http://res.cloudinary.com/doxrlcgtc/image/upload/v1539160790/vvpfkkzhbhyhujaxepz7.jpg'
  );
INSERT INTO
  `imagenes` (`idimagen`, `idpadre`, `public_id`, `tipo`, `url`)
VALUES
  (
    32,
    10,
    'im7zoh5vaw2yg4sdoczv',
    'DOMICILIO',
    'http://res.cloudinary.com/doxrlcgtc/image/upload/v1539160790/im7zoh5vaw2yg4sdoczv.jpg'
  );
INSERT INTO
  `imagenes` (`idimagen`, `idpadre`, `public_id`, `tipo`, `url`)
VALUES
  (
    33,
    2,
    'zuuf7sgw7cys8f8z4jis',
    'DOMICILIO',
    'http://res.cloudinary.com/doxrlcgtc/image/upload/v1539162056/zuuf7sgw7cys8f8z4jis.jpg'
  );
INSERT INTO
  `imagenes` (`idimagen`, `idpadre`, `public_id`, `tipo`, `url`)
VALUES
  (
    34,
    2,
    'x4jn2lfktddyzuucp7lh',
    'INE',
    'http://res.cloudinary.com/doxrlcgtc/image/upload/v1539162056/x4jn2lfktddyzuucp7lh.jpg'
  );
INSERT INTO
  `imagenes` (`idimagen`, `idpadre`, `public_id`, `tipo`, `url`)
VALUES
  (
    35,
    3,
    'ln8gmcfuqxd6nwvp3cti',
    'INE',
    'http://res.cloudinary.com/doxrlcgtc/image/upload/v1539233214/ln8gmcfuqxd6nwvp3cti.jpg'
  );
INSERT INTO
  `imagenes` (`idimagen`, `idpadre`, `public_id`, `tipo`, `url`)
VALUES
  (
    36,
    3,
    'r6svxuolpskqmuipduw6',
    'DOMICILIO',
    'http://res.cloudinary.com/doxrlcgtc/image/upload/v1539233216/r6svxuolpskqmuipduw6.jpg'
  );
INSERT INTO
  `imagenes` (`idimagen`, `idpadre`, `public_id`, `tipo`, `url`)
VALUES
  (
    37,
    4,
    'a1m4fgrvxia1g82qtmpi',
    'DOMICILIO',
    'http://res.cloudinary.com/doxrlcgtc/image/upload/v1539233826/a1m4fgrvxia1g82qtmpi.jpg'
  );
INSERT INTO
  `imagenes` (`idimagen`, `idpadre`, `public_id`, `tipo`, `url`)
VALUES
  (
    38,
    4,
    'coaewgzmhkh6ec8s1adt',
    'INE',
    'http://res.cloudinary.com/doxrlcgtc/image/upload/v1539233829/coaewgzmhkh6ec8s1adt.png'
  );
INSERT INTO
  `imagenes` (`idimagen`, `idpadre`, `public_id`, `tipo`, `url`)
VALUES
  (
    39,
    4,
    'widjyqqhk3593m4vxcut',
    'CONTRATO',
    'http://res.cloudinary.com/doxrlcgtc/image/upload/v1539233834/widjyqqhk3593m4vxcut.jpg'
  );
INSERT INTO
  `imagenes` (`idimagen`, `idpadre`, `public_id`, `tipo`, `url`)
VALUES
  (
    40,
    1,
    'fsiupw6buch0vn40ge5r',
    'INE',
    'http://res.cloudinary.com/doxrlcgtc/image/upload/v1539234107/fsiupw6buch0vn40ge5r.jpg'
  );
INSERT INTO
  `imagenes` (`idimagen`, `idpadre`, `public_id`, `tipo`, `url`)
VALUES
  (
    41,
    1,
    'uijlugnyd887fn7db7wy',
    'NEGOCIO',
    'http://res.cloudinary.com/doxrlcgtc/image/upload/v1539234110/uijlugnyd887fn7db7wy.jpg'
  );
INSERT INTO
  `imagenes` (`idimagen`, `idpadre`, `public_id`, `tipo`, `url`)
VALUES
  (
    42,
    1,
    'g8fg5rnlrikuufgtph2g',
    'CONTRATO',
    'http://res.cloudinary.com/doxrlcgtc/image/upload/v1539234111/g8fg5rnlrikuufgtph2g.png'
  );
INSERT INTO
  `imagenes` (`idimagen`, `idpadre`, `public_id`, `tipo`, `url`)
VALUES
  (
    43,
    1,
    'wxulvt418hybonivdxc2',
    'DOMICILIO',
    'http://res.cloudinary.com/doxrlcgtc/image/upload/v1539234112/wxulvt418hybonivdxc2.jpg'
  );
INSERT INTO
  `imagenes` (`idimagen`, `idpadre`, `public_id`, `tipo`, `url`)
VALUES
  (
    44,
    1,
    'qoiblzb1wjbvcbg37x5m',
    'NEGOCIO',
    'http://res.cloudinary.com/doxrlcgtc/image/upload/v1539234122/qoiblzb1wjbvcbg37x5m.jpg'
  );
INSERT INTO
  `imagenes` (`idimagen`, `idpadre`, `public_id`, `tipo`, `url`)
VALUES
  (
    45,
    2,
    'xbeodxhpsw2tnbztup1j',
    'NEGOCIO',
    'http://res.cloudinary.com/doxrlcgtc/image/upload/v1539235060/xbeodxhpsw2tnbztup1j.jpg'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: investigaciones
# ------------------------------------------------------------

INSERT INTO
  `investigaciones` (
    `idinvestigacion`,
    `idcliente`,
    `idnegocio`,
    `fecha_nacimiento`,
    `edad`,
    `edo_civil`,
    `calle`,
    `num_ext`,
    `num_int`,
    `colonia`,
    `municipio`,
    `estado`,
    `poblacion`,
    `tel`,
    `casa_propia`,
    `num_dependientes`,
    `monto_credito`,
    `tipo_comprobante`,
    `calle_negocio`,
    `num_ext_negocio`,
    `num_int_negocio`,
    `colonia_negocio`,
    `municipio_negocio`,
    `estado_negocio`,
    `poblacion_negocio`,
    `horario`,
    `nombre_aval`,
    `tiempo_aval`,
    `tel_aval`,
    `nombre_fam`,
    `parentezco`,
    `tel_fam`,
    `como_supo`,
    `especificar`,
    `fecha`,
    `comentarios_capturista`,
    `status`
  )
VALUES
  (
    1,
    1,
    1,
    '1997-07-19',
    '21',
    'CASADO',
    'ASDASD',
    '123',
    '12312',
    'ASDAFAS',
    'SDASDASD',
    'SINALOA',
    'ASDASD',
    '(342)342-3423',
    'RENTADO',
    3,
    2333,
    'RECIBO DE LUZ',
    'ADASD',
    '34234',
    '3434',
    'ASDASD',
    'ASDASD',
    'SINALOA',
    'SDASDASD',
    'SDASD',
    'DASDASD',
    '2 ADSD',
    '(342)342-3423',
    'ASDASDASD',
    'ASDASDASD',
    '(234)234-2342',
    'VOLANTE',
    'null',
    '2018-10-11',
    'ASDASDASDASD',
    'REALIZADA'
  );
INSERT INTO
  `investigaciones` (
    `idinvestigacion`,
    `idcliente`,
    `idnegocio`,
    `fecha_nacimiento`,
    `edad`,
    `edo_civil`,
    `calle`,
    `num_ext`,
    `num_int`,
    `colonia`,
    `municipio`,
    `estado`,
    `poblacion`,
    `tel`,
    `casa_propia`,
    `num_dependientes`,
    `monto_credito`,
    `tipo_comprobante`,
    `calle_negocio`,
    `num_ext_negocio`,
    `num_int_negocio`,
    `colonia_negocio`,
    `municipio_negocio`,
    `estado_negocio`,
    `poblacion_negocio`,
    `horario`,
    `nombre_aval`,
    `tiempo_aval`,
    `tel_aval`,
    `nombre_fam`,
    `parentezco`,
    `tel_fam`,
    `como_supo`,
    `especificar`,
    `fecha`,
    `comentarios_capturista`,
    `status`
  )
VALUES
  (
    2,
    2,
    2,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    'PENDIENTE'
  );
INSERT INTO
  `investigaciones` (
    `idinvestigacion`,
    `idcliente`,
    `idnegocio`,
    `fecha_nacimiento`,
    `edad`,
    `edo_civil`,
    `calle`,
    `num_ext`,
    `num_int`,
    `colonia`,
    `municipio`,
    `estado`,
    `poblacion`,
    `tel`,
    `casa_propia`,
    `num_dependientes`,
    `monto_credito`,
    `tipo_comprobante`,
    `calle_negocio`,
    `num_ext_negocio`,
    `num_int_negocio`,
    `colonia_negocio`,
    `municipio_negocio`,
    `estado_negocio`,
    `poblacion_negocio`,
    `horario`,
    `nombre_aval`,
    `tiempo_aval`,
    `tel_aval`,
    `nombre_fam`,
    `parentezco`,
    `tel_fam`,
    `como_supo`,
    `especificar`,
    `fecha`,
    `comentarios_capturista`,
    `status`
  )
VALUES
  (
    3,
    1,
    3,
    'null',
    'null',
    'null',
    'null',
    'null',
    'null',
    'null',
    'null',
    'null',
    'null',
    'null',
    'null',
    0,
    NULL,
    'null',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    'PENDIENTE'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: negocios
# ------------------------------------------------------------

INSERT INTO
  `negocios` (
    `idnegocio`,
    `idcliente`,
    `nombre_negocio`,
    `giro`,
    `tipo`,
    `comentarios`,
    `ubicacion`,
    `propietario`,
    `antiguedad`,
    `arrendamiento`
  )
VALUES
  (
    1,
    1,
    'AKJSDHASKH',
    'NA',
    'LOCAL FIJO',
    'NA',
    '27.4864,-109.9408',
    'SI',
    '10 MES(S)',
    'SI'
  );
INSERT INTO
  `negocios` (
    `idnegocio`,
    `idcliente`,
    `nombre_negocio`,
    `giro`,
    `tipo`,
    `comentarios`,
    `ubicacion`,
    `propietario`,
    `antiguedad`,
    `arrendamiento`
  )
VALUES
  (
    2,
    2,
    'SFDSDF',
    'SDFSDF',
    'AMBULANTE',
    'SDFSD',
    '27.4864,-109.9408',
    'NO',
    '4 MES(S)',
    'NO'
  );
INSERT INTO
  `negocios` (
    `idnegocio`,
    `idcliente`,
    `nombre_negocio`,
    `giro`,
    `tipo`,
    `comentarios`,
    `ubicacion`,
    `propietario`,
    `antiguedad`,
    `arrendamiento`
  )
VALUES
  (
    3,
    1,
    'ANA NEGOCIO',
    'SDASDASD',
    'AMBULANTE',
    'SAD',
    '27.4864,-109.9408',
    'NO',
    '1 AÑO(S)',
    'null'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: redes_sociales
# ------------------------------------------------------------

INSERT INTO
  `redes_sociales` (`idred`, `idsucursal`, `nombre_red`, `url`)
VALUES
  (12, 7, 'FACEBOOK', 'prestamosalinstante');
INSERT INTO
  `redes_sociales` (`idred`, `idsucursal`, `nombre_red`, `url`)
VALUES
  (13, 8, 'FACEBOOK', 'sucursalHidalgo');
INSERT INTO
  `redes_sociales` (`idred`, `idsucursal`, `nombre_red`, `url`)
VALUES
  (
    14,
    9,
    'FACEBOOK',
    'https://m.facebook.com/campaign/landing.php?&campaign_id=867690826738572&extra_1=s%7Cm%7C252439538079%7Ce%7Cfacebook..%7C&placement&creative=252439538079&keyword=facebook..&partner_id=googlesem&extra_2=campaignid%3D952048466%26adgroupid%3D50091164587%26matchtype%3De%26network%3Dg%26source%3Dmobile%26search_or_content%3Ds%26device%3Dm%26devicemodel%3D%26adposition%3D1t1%26target%3D%26targetid%3Dkwd-362360551109%26loc_physical_ms%3D1010043%26loc_interest_ms%3D%26feeditemid%3D%26param1%3D%26param2%3D&gclid=Cj0KCQjwlqLdBRCKARIsAPxTGaVf8VUqsjSg6n8lWJP0pEDqlAzcVziIFHrMHl4kuKj-OpUaFnY_6xQaAglEEALw_wcB'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: sucursales
# ------------------------------------------------------------

INSERT INTO
  `sucursales` (
    `idsucursal`,
    `idencargado`,
    `nombre`,
    `telefono`,
    `hora_inicio`,
    `hora_fin`,
    `callenum`,
    `colonia`,
    `poblacion`,
    `municipio`,
    `estado`,
    `cp`
  )
VALUES
  (
    7,
    1000000007,
    'CDMX',
    ', (555)555-4411',
    '08:00',
    '18:00',
    'AV. PASEO DE LA REFORMA SN',
    'CONDESA',
    'CIUDAD DE MÉXICOS',
    'REFORMA',
    'DISTRITO FEDERAL',
    '10000'
  );
INSERT INTO
  `sucursales` (
    `idsucursal`,
    `idencargado`,
    `nombre`,
    `telefono`,
    `hora_inicio`,
    `hora_fin`,
    `callenum`,
    `colonia`,
    `poblacion`,
    `municipio`,
    `estado`,
    `cp`
  )
VALUES
  (
    8,
    1000000011,
    'HIDALGO',
    ', (777)221-2313',
    '09:00',
    '17:00',
    'MIGUEL HIDALGO 44',
    'TULA',
    'PACHUCA',
    'PACHUCA',
    'HIDALGO',
    '67827'
  );
INSERT INTO
  `sucursales` (
    `idsucursal`,
    `idencargado`,
    `nombre`,
    `telefono`,
    `hora_inicio`,
    `hora_fin`,
    `callenum`,
    `colonia`,
    `poblacion`,
    `municipio`,
    `estado`,
    `cp`
  )
VALUES
  (
    9,
    1000000012,
    'TULA 1',
    ', (556)546-0150, (773)113-4585',
    '09:00',
    '18:00',
    '10 DE MAYO',
    'TULA DE ALLENDE',
    'TULA',
    'TULA DE ALLENDE',
    'HIDALGO',
    '4550'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tipos_creditos
# ------------------------------------------------------------

INSERT INTO
  `tipos_creditos` (
    `idtipo`,
    `idempresa`,
    `descripcion`,
    `tipo`,
    `tiempo`,
    `interes`,
    `status`
  )
VALUES
  (7, 6, 'A20', 'PAGOS DIARIOS', 20, 20, 'ACTIVO');
INSERT INTO
  `tipos_creditos` (
    `idtipo`,
    `idempresa`,
    `descripcion`,
    `tipo`,
    `tiempo`,
    `interes`,
    `status`
  )
VALUES
  (8, 6, 'CREDITO 2 MESES', 'SEMANALES', 8, 10, 'ACTIVO');
INSERT INTO
  `tipos_creditos` (
    `idtipo`,
    `idempresa`,
    `descripcion`,
    `tipo`,
    `tiempo`,
    `interes`,
    `status`
  )
VALUES
  (9, 7, 'DIARIO - 30 DÍAS', 'DIARIOS', 30, 30, 'ACTIVO');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: usuarios
# ------------------------------------------------------------

INSERT INTO
  `usuarios` (`idusuario`, `idempleado`, `usuario`, `password`)
VALUES
  (999999999, 999999999, 'admin', 'SuperAdmin1234');
INSERT INTO
  `usuarios` (`idusuario`, `idempleado`, `usuario`, `password`)
VALUES
  (1000000007, 1000000007, 'jlllamas', 'jlllamas');
INSERT INTO
  `usuarios` (`idusuario`, `idempleado`, `usuario`, `password`)
VALUES
  (1000000008, 1000000008, 'zcota', 'zcota');
INSERT INTO
  `usuarios` (`idusuario`, `idempleado`, `usuario`, `password`)
VALUES
  (1000000009, 1000000009, 'cilopez', 'cilopez');
INSERT INTO
  `usuarios` (`idusuario`, `idempleado`, `usuario`, `password`)
VALUES
  (1000000010, 1000000010, 'eanaya', 'eanaya');
INSERT INTO
  `usuarios` (`idusuario`, `idempleado`, `usuario`, `password`)
VALUES
  (1000000011, 1000000011, 'mpinzunza', 'mpinzunza');
INSERT INTO
  `usuarios` (`idusuario`, `idempleado`, `usuario`, `password`)
VALUES
  (
    1000000012,
    1000000012,
    'Supervisor2',
    'supervisor2'
  );
INSERT INTO
  `usuarios` (`idusuario`, `idempleado`, `usuario`, `password`)
VALUES
  (1000000013, 1000000013, 'luis1234', 'luis1234');
INSERT INTO
  `usuarios` (`idusuario`, `idempleado`, `usuario`, `password`)
VALUES
  (1000000014, 1000000014, 'angel1234', 'angel1234');
INSERT INTO
  `usuarios` (`idusuario`, `idempleado`, `usuario`, `password`)
VALUES
  (1000000015, 1000000015, 'Cobrador2', 'co rador2');

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
