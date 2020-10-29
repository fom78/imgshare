const express = require('express');

const config = require('./server/config');

//database
require('./database');

const app = config(express()); //expres() devuelve un objeto, que se lo pasamos a config y alli se labura.

//Iniciando Servidor
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto', app.get('port'));
});