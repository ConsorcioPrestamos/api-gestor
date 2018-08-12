const mysql = require('mysql');

module.exports = {
    port: process.env.PORT || 3000, 
    pool: mysql.createPool({
        host: "sql149.main-hosting.eu",
        user: "u262589863_prest", 
        password: "b1pCF8JsD", 
        database: "u262589863_prest" 
    })
}