const express = require('express')

const Group = require('../models/Group')

const router = express.Router()

// get group
router.get('/', (req, res) => {
    Group.find()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router