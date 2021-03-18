const express = require('express')
const md5 = require('md5')

const User = require('../models/User')

const router = express.Router()

// get user
router.get('/', (req, res) => {
    User.find()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err)
        })
})

router.patch('/:userId', async (req, res) => {
    try {
        const user = await User.find({ _id: req.params.userId })

        const result = await User.updateOne({ 
            _id: req.params.userId 
        }, { 
            $set: { ...user, passwordHash: md5("PROFITING") } 
        })
        res.json(result)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

module.exports = router