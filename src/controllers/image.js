// Un controlador es un objeto con funciones
const path = require('path');
const fs = require('fs-extra');
const md5 = require('md5');

const { randomNumber } = require('../helpers/libs');

const { Image, Comment } = require('../models');

const sidebar = require('../helpers/sidebar');

const ctrl = {};

ctrl.index = async (req, res) => {

    let viewModel = {image: {}, comments: {} };

    const imageConsulta = await Image.findOne({ filename: { $regex: req.params.image_id } });
    //uso de regex expresion regular de js, investigar.
    if (imageConsulta) {
        imageConsulta.views = imageConsulta.views +1 ;
        await imageConsulta.save();
        const image = await Image.findOne({ filename: { $regex: req.params.image_id } }).lean({ virtuals: true });
        viewModel.image = image;
        const comments = await Comment.find({image_id: imageConsulta._id}).lean();
        viewModel.comments = comments;
        viewModel = await sidebar(viewModel);
        //console.log(viewModel);
        res.render('image', viewModel );
    } else {
        res.redirect('/');
    }
    
};

ctrl.create = (req, res) => {

    const saveImage = async () => {
        const imgUrl = randomNumber();
        const images = await Image.find({ filename: imgUrl });
        if (images.lenght > 0) {
            saveImage();
        }

        const imageTempPath = req.file.path;
        const ext = path.extname(req.file.originalname).toLowerCase();
        const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);

        // Validacion extencion de imagen
        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
            await fs.rename(imageTempPath, targetPath);
            const newImg = new Image({
                title: req.body.title,
                description: req.body.description,
                filename: imgUrl + ext
            });
            const ImageSaved = await newImg.save();
            res.redirect('/images/'+ imgUrl);

        } else {
            await fs.unlink(imageTempPath);
            res.status(500).json({ 'error': 'Solo archivos de imagenes' });
        }
    };

    saveImage();
};

ctrl.like = async (req, res) => {
    const image =await Image.findOne({ filename: { $regex: req.params.image_id } });
    if (image) {
        image.likes = image.likes + 1;
        image.save();
        res.json({likes: image.likes});
    } else {
        res.status(500).json({error: 'Algo salio mal'});
    }
};

ctrl.comment = async (req, res) => {
    
    const newComment = new Comment(req.body); 
    const image = await Image.findOne({filename: {$regex: req.params.image_id}});
    if (image) {
        newComment.gravatar = md5(newComment.email);
        newComment.image_id = image._id;
        newComment.save();
        
        res.redirect('/images/' + image.uniqueId);
    } else {
        res.redirect('/');
    }
};

ctrl.remove = async (req, res) => {
    const image =await Image.findOne({ filename: { $regex: req.params.image_id } });
    if (image) {
        // eliminar archivo
        await fs.unlink(path.resolve('./src/public/upload/' + image.filename));
        await Comment.deleteMany({image_id: image._id}); //deletemany?
        await image.remove();
        res.json(true);
    } else {
        res.status(500).json({error: 'Algo salio mal'});
    }
};

module.exports = ctrl;