const express = require('express')

const Task = require('../models/Task')

const router = express.Router()

// get task
router.get('/', async (req, res) => {
    try {
        const result = await Task.find()
        res.send(result);
    } catch (error) {
        res.json({ message: error })
    }
})

// add task
router.post('/', async (req, res) => {
    const task = new Task({
        id: req.body.id,
        name: req.body.name,
        owner: req.body.owner,
        group: req.body.group,
        isComplete: false
    })

    try {
        const newTask = await task.save()
        res.json(newTask)
    } catch (error) {
        res.json({ message: error })
    }
})

// get a task using the id field
router.get('/:taskId', async (req, res) => {
    try {
        const result = await Task.find({ id: req.params.taskId })
        res.json(result)
    } catch (error) {
        res.json({ message: error })
    }
})

// update a task
router.patch('/:taskId', async (req, res) => {
    try {
        const task = await Task.find({ id: req.params.taskId })

        if (task) {
            const result = await Task.updateOne({ 
                id: req.params.taskId 
            }, { 
                $set: { ...task, ...req.body } 
            })
            res.json(result)
        } else res.json('not found')
        
        
    } catch (error) {
        res.json({ message: error })
    }
})

// delete a task
router.delete('/:taskId', async (req, res) => {
    try {
        const result = await Task.remove({ id: req.params.taskId })
        res.json(result)
    } catch (error) {
        res.json({ message: error })
    }
})

module.exports = router