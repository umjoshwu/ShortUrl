const mongoose = require('mongoose')
const shortId = require('shortid')


//new mongoose shcema; takes in an obj (columns in databse)
const shortUrlSchema = new mongoose.Schema({
    //name of column in database
    full: {
        type: String,
        required: true
    },

    short:{
        type: String,
        required: true,
        default: shortId.generate
        //default value for short column
    },
    clicks:{
        type: Number,
        required: true,
        default: 0
    }
})

//export this; takes model and schema. hooks up database & model.
//can affect database using model
module.exports = mongoose.model('ShortUrl', shortUrlSchema)
