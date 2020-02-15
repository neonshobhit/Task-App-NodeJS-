const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const User = require('../models/user')

router.get('/test', (req,res) => {
    res.send("From a new file")
})

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        const token = await user.generateAuthToken()
        await user.save()
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }


    /*
    user.save().then(() => {
        res.send(user)
    }).catch((error) => {
        res.status(400).send(error)
    })
    */
})

router.post('/users/signup', async (req, res) => {

})


router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }

})

router.post('/users/logout', auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutALL', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.send()

    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    
    res.send(req.user)
    
    /*
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send(e)

    }
    */
    

    /*
    User.find({}).then((users) => {
        res.send(users)
    }).catch((error) => {
        res.status(500).send(error)
    })
    */
})

/* 


router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user) {
            throw res.status(400).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
    
    // User.findById(_id).then((user) => {
    //     if (!user) {
    //         return res.status(404).send()
    //     }
    //     res.send(user)
    // }).catch((error) => {
    //     res.status(500).send(error)
    // })
    
    

    console.log(req.params)
}) 

*/



/*/users/:id*/
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' })
    }

    try {
        //const user = await User.findById(req.params.id)
        const user = req.user

        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            //mongoose middleware is bypassed by this method, that's why we have to use the traditional method of node to update
 /*       if (!user) {
            return res.status(404).send()
            //why not throw?
            //if uses throw then an error generates in the console:
            

            //UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on 
//unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)
//(node:25940) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
            
        }
*/
        res.send(user)
    } catch (e) {
        res.status(404).send(e)
        //res.send(e)
    }
})
/*
/users/:id
*/
router.delete('/users/me', auth, async (req,res) => {
    try {
        const user = await User.findByIdAndDelete(req.user._id) //req.params.id
        /*
        no more need 
        if (!user) {
            return res.status(404).send()
        }
        */

        await req.user.remove()

        res.send(req.user)
    } catch (e) {
        res.status(500).send()

    }
})

module.exports = router