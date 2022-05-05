//acá ira url de mi servidor
//url de pagina principal

const express = require('express');
const router = express.Router()
//const router = require('express').Router()||permite tener un objeto que puede facilitarme la creacion de rutas
const pool = require('../database') //importo conexion a db //llamado pool solo por cambio de nombre

router.get('/add', (req, res) =>{
    res.render('links/add') //esto manda a la pagina inicial.
})

router.post('/add', (req, res) =>{
    res.send('received') //esto manda a la pagina inicial.
})

module.exports = router;