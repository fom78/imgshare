const mongoose = require('mongoose');

const {database} = require('./keys');

mongoose.connect(database.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}) //realiza la conexion.
    .then (db => console.log(('DB esta Conectada: '+ database.DB_NAME)))
    .catch(err => console.log(err));