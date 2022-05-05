const express = require('express');
const path = require('path'); //path me permite unir directorios 
const morgan = require('morgan');
const exphbs = require('express-handlebars');//hbs para saber que son archivos de handlebars

//Initillization
const app = express()

//Settings
app.set('port', process.env.PORT || 4000) //si tiene puerto, lo usa. Sino, utiliza el 4000
app.set('views', path.join(__dirname, 'views'))//dirname devuelve la ruta del archivo y lo concatena *1

app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layout'), //obtener la direccion de views y concatenar con layout*1
    partialsDir: path.join(app.get('views'), 'partials'),//partes de html que podemos ver //+lo mismo arriba
    extname: '.hbs', //qué extensión van a tener nuestros archivos de handlebars = .hbs //los archivos terminan asi
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//Middleware //funciones que se ejecutan cada que el usuario envie una peticion al servidor
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))//aceptar desde los formularios los datos
app.use(express.json())//configurando lo que podriamos tener en futuras mejoras de la app = archivs json

//Global variables
app.use((req,res, next) => {

    next(); //toma la informacion del usurario, lo q el servidor repsonde y una funcion para continuar codigo
})

//Routes //fallan si estan vacias
app.use(require('./routes/')); //Automaticamente busca el archivo index.js
app.use(require('./routes/authentication')); 
app.use('/links', require('./routes/links')); 

//Public //donde voy a colocar imagenes, fuentes, etc
app.use(express.static(path.join(__dirname, 'public')))

//Starting the server
app.listen(app.get('port'),() => {
    console.log('Server on port ', app.get('port')) //
})