const mysql = require('mysql');

module.exports = {
    port: process.env.PORT || 3000, 
    connection:()=>{return mysql.createConnection({ 
        host: "sql149.main-hosting.eu",
        user: "u262589863_prest", 
        password: "6LMHbFbNo", 
        database: "u262589863_prest"
    })},  
    pool: mysql.createPool({
        host: "sql149.main-hosting.eu",
        user: "u262589863_prest", 
        password: "6LMHbFbNo", 
        database: "u262589863_prest" 
    })
    // pool: mysql.createPool({
    //     host: "localhost",
    //     user: "root", 
    //     password: "", 
    //     database: "u262589863_prest" 
    // }),
    // connection:()=>{return mysql.createConnection({ 
    //     host: "localhost",
    //     user: "root", 
    //     password: "", 
    //     database: "u262589863_prest" 
    // })}
}