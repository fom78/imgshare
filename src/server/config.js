const path = require('path');
const exphbs = require('express-handlebars');

const morgan = require('morgan');
const multer = require('multer');
const express = require('express');

const routes = require('../routes');

const errorHandler = require('errorhandler');

module.exports = app => {

    // Settings
    app.set('port', process.env.PORT || 3000); // Si en el entorno tengo un puerto definido en PORT lo uso, sino es 3000
    app.set('views', path.join(__dirname, '../views')); // definimos la ruta para la carpeta de vistas
    // Seteando el motor de plantillas de handlebars
    app.engine('.hbs', exphbs({
        defaultLayout: 'main', // defecto para hbs
        partialsDir: path.join(app.get('views'), 'partials'), // las vistas parciales estan en views/partials
        layoutsDir: path.join(app.get('views'), 'layouts'),
        extname: '.hbs',
        helpers: require('./helpers') // helpers de hdl unicamente.
    }));
    app.set('view engine', '.hbs'); // le decimos a la app que motor de plantillas usar.

    //Middlewares
    app.use(morgan('dev'));
    //al subir una imagen colocarla aqui, y se sube de a una por vez, desde la variable/campo image.
    app.use(multer({dest: path.join(__dirname, '../public/upload/temp')}).single('image')); 
    app.use(express.urlencoded({extended: false})) //Para poder recibir las imagenes del formulario
    app.use(express.json()); // Para las peticiones AJAX

    // routes
    routes(app);

    //static files
    app.use('/public',express.static(path.join(__dirname, '../public')))

    //errorhandler
    if ('development' === app.get('dev')) {
        app.use(errorHandler);
    }

    return app;
}