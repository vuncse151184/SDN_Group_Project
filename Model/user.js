const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    isNatural: {
        type: Boolean,
        default: false
    },
    origin: {
        type: String,
        require: true
    },
    comments: [commentSchema],
    category: {
        type: Schema.Types.ObjectId,
        ref: "Categories",
        require: true
    },
}, { timestamps: true, });


const Users = mongoose.model('Users', userSchema)
module.exports = Users