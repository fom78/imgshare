const Stats = require('./stats');
const Images = require('./images');
const Comments = require('./comments');
const { Promise } = require('mongoose');

module.exports = async viewModel => {

    const result = await Promise.all([
        Stats(), //el objeto no tiene metodos asi que al llamrlo devuelve lo que exporta
        Images.popular(),
        Comments.newest()
    ]);

    viewModel.sidebar = {
        stats: result[0],
        popular: result[1],
        comments: result[2]
    };
    //console.log('como va: ', viewModel);
    //console.log('Popular: ',result[1]);
    return viewModel;
};