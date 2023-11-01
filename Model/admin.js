const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema({
    username: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true
    }
}, { timestamps: true, });


const Admins = mongoose.model('Admins', adminSchema)
module.exports = Admins