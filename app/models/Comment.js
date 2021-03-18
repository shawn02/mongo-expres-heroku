const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    id: String,
    task: String,
    owner: String,
    content: String
}, { timestamps: true })

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment