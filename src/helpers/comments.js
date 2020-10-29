const { Comment, Image } = require('../models');

module.exports = {

    async newest() {
        const comments = await Comment.find().lean({ virtuals: true })
            .limit(5)
            .sort({timestamp: -1});
        
            //OJO esto mismo puede hacerse con populate de mongodb, INVESTIGAR
            for (const comment of comments) {
                const image = await Image.findOne({_id: comment.image_id}).lean({ virtuals: true });
                comment.image = image;
            }
            return comments;
    }
};