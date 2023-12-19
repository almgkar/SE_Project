const mongoose = require('mongoose')
const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true

    }, 
    Author:{
        type: String,
        required: true

    },
    AddedDate:{
        type: String,
        required: true,
        default: Date.now

    }
})
module.exports = mongoose.model('bookDb', bookSchema) 