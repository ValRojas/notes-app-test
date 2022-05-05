//acá ira url de mi servidor
//url de pagina principal

const express = require('express');
const router = express.Router()
//const router = require('express').Router(); //me permite tener un objeto que puede facilitarme la creacion de rutas

router.get('/', (req, res) =>{
    res.send('hello world2') //esto manda a la pagina inicial.
})

module.exports = router;