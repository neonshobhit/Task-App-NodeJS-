const express = require('express')
const Task = require('../models/task')
const router = new express.Router()



router.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    } catch (e) {
        res.status(500).send(e)

    }
    /*

    Task.find({}).then((users) => {
        res.status(400).send(users)
    }).catch((e) => {
        res.status(500).send()

    })
    */
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        if (!task) {
            throw res.status(404).send()
        }
        res.send(task)

    } catch (e) {
        res.status(500).send(e)
    }

    /*
    Task.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send()

        }
        res.send(user)

    }).catch((e) => {
        res.status(500).send(e)
    })
    */

})

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)

    } catch (e) {
        res.send(400).send(e)
    }
    /*
    task.save().then(() => {
        res.status(201).send(task)
    }).catch((error) => {
        res.status(400).send(error)
    })
    */
})


router.patch('/tasks/:id', async (req, res) => {
    const allowedUpdates = ['description', 'completed']
    const keys = Object.keys(req.body)
    const isValidOperation = keys.every((key) => allowedUpdates.includes(key))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid operations' })
    }

    try {
        
        const task = await Task.findById(req.params.id)
        keys.forEach((update) => task[update] = req.body[update])
        task.save()
        //middleware
        
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!task) {
            return res.status(404).send()

        }
        res.send(task)
    } catch (e) {
        res.status(400).send({error: "Invalid "})
    }


})




router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e) 
    }
})




module.exports = router