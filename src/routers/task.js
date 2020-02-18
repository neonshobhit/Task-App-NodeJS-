const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()



// Get /tasks?completed=true
// GET /tasks?limit=10&skip=10
// GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}
    // isMatch = req.query.completed === 'true'
    // Why i had to make another variable?
    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        //val = parts[1] === 'desc'? -1 : 1
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
        //sort[parts[0]] = val
    }

    try {
        
        //const tasks = await Task.find({})
        //also: const tasks = await Task.find({owner: req.user._id})
        //await req.user.populate('tasks').execPopulate()
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort,
            }
        }).execPopulate() 
        res.status(200).send(req.user.tasks)
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

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        //const task = await Task.findById(_id)
        const task = await Task.findOne({_id, owner: req.user._id})
       
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

router.post('/tasks', auth, async (req, res) => {
    //const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id,
    })
    //copy all the data from req.body and add the other fields

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


router.patch('/tasks/:id', auth, async (req, res) => {
    const allowedUpdates = ['description', 'completed']
    const keys = Object.keys(req.body)
    const isValidOperation = keys.every((key) => allowedUpdates.includes(key))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid operations' })
    }

    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})
        
        //const task = await Task.findById(req.params.id)
        //keys.forEach((update) => task[update] = req.body[update])
        //task.save()
        //middleware
        
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!task) {
            return res.status(404).send()

        }
        keys.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send({error: "Invalid "})
    }


})




router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        //const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})
        

        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e) 
    }
})




module.exports = router