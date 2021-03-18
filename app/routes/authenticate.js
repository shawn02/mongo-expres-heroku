const express = require('express')
const md5 = require('md5')
const { v4: uuidv4 } = require('uuid')

const User = require('../models/User')
const Task = require('../models/Task')
const Group = require('../models/Group')

const router = express.Router()

const authenticationTokens = []

const assembleUserState = async (user) => {
    try {
        const tasks = await Task.find({ owner: user.id })
        const groups = await Group.find({ owner: user.id })
        return {
            tasks,
            groups,
            session: { authenticated: 'AUTHENTICATED', id: user.id }
        }
    } catch (error) {
        console.log('error', error)
    }
}

router.post('/', async (req, res) => {
    let { username, password } = req.body
    try {
        const user = await User.findOne({ name: username })
        if (!user) return res.status(500).send("User not found");

        const hash = md5(password)
        const isPasswordCorrect = hash === user.passwordHash

        if (!isPasswordCorrect) return res.status(500).send("Password incorrect");

        const token = uuidv4()
        const state = await assembleUserState(user)

        authenticationTokens.push({
            token, 
            userId: user.id
        })

        res.send({ token, state })
    } catch (err) {
        console.log(err)
        res.status(500)
    }
})

module.exports = router
