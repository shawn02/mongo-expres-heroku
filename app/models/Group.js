const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    id: String,
    name: String,
    owner: String
}, { timestamps: true })


const Group = mongoose.model('Group', groupSchema)

module.exports = Group