const express = require('express')

const Comment = require('../models/Comment')

const router = express.Router()

// get comment
router.get('/', (req, res) => {
    Comment.find()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router