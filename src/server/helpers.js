// helpers para handelbars, ej formateo de fecha.
// al ser felper de hdb, ya esta configurado en config, y las funciones son visibles desde las vistas!!!

const moment = require('moment');
moment.locale('es');
const helpers = {};

helpers.timeago = timestamp => {
    //retorna un tiempo de atras desde el que se le da. Ej: "Hace 58 minutos"
   return  moment(timestamp).startOf('minute').fromNow();
};

helpers.getCurrentYear = () => {
    return new Date().getFullYear();
}

module.exports = helpers;
