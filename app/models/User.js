const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: String,
    name: String,
    passwordHash: String,
    friends: [{ type: String }]
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

module.exports = User