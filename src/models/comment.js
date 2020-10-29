const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema;

//const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
//const path = require('path');

const CommentSchema = new Schema({
    image_id: {type: ObjectId}, // referencias....
    email: { type: String },
    name: { type: String },
    gravatar: { type: String },
    comment: { type: String },
    timestamp: {type: Date, default: Date.now }
});

CommentSchema.virtual('image')
    .set(function(image){
    this._image = image;
    }) //el seteo para el uso en helpers/comments
    .get(function(){
        return this._image;
    });

module.exports = mongoose.model('Comment',CommentSchema);