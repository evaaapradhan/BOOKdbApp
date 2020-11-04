var mongoose = require('mongoose');

const BookSchema = mongoose.Schema(
    {
        title:String,
        author: String,
        description: String,
        genre:{
            type:String
        },
        createAt: {
            type:Date,
            default: Date.now()
        }
    })

    module.exports = mongoose.model('Books', BookSchema);