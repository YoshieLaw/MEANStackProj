const mongoose = require('mongoose')

const ListSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: 3,
        trim: true,
        required: true
    }
})

const List = mongoose.model('List', ListSchema)

module.exports = List;