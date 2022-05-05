//Acá se importa el module de mysql
const mysql = require('mysql');
const {database} = require('./keys') //solo necesito una parte 
const {promisify}= require('util') //callback que sql soporta
const pool = mysql.createPool(database); //ENTORNO DE PRODUCCION / cada hilo se ejecuta a la vez

pool.getConnection((err, connection) =>{ //En caso de errores
    if(err){
        if(err.code == 'PROCOLORE_CONNECTION_LOST'){//si la conexion de datos fue perdida
            console.error(' DATABASE CONNECTION WAS LOST');
        }
        if(err.code == 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TOO MANY CONNECTION');
        }
        if(err.code == 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }
    if(connection)connection.release(); //si hay conexion
    console.log('DB is CONNECTED');
    return;
})

pool.query=promisify(pool.query)
module.exports = pool;
