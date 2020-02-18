const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000


// app.use((req, res, next) => {
//     console.log(req.method, req.path)
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })

// app.use((req, res, next) => {
    // res.status(503).send("Site under maintenance") 
    //req.abc = 12
    //console.log(req.abc)
    //console.log(req.user)
    //res.send(req.toObject())
// })


// const multer = require('multer')
// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000,
//     },
//     fileFilter(req, file, cb) {
//         // if (!file.originalname.endsWith('.pdf')) {
//         //     return cb(new Error('Please upload a PDF'))
//         // }
//         if (!file.originalname.match(/\.(doc|docx)$/)) {
//             return cb(new Error('Please upload a DOC/DOCX file.'))
//         }

//         cb(undefined, true)
        
//         // cb(new Error('File must be a PDF'))
//         // cb(undefined, true)
//         // cb(undefined, false)

//     }
// })




// const errorMessage = (req, res, next) => {
//     throw new Error('Errorssss')
// }

// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// }, (error, req, res, next) => {
//     res.status(400).send({error: error.message})
// })







app.use(express.json())
app.use(userRouter)
app.use(taskRouter)






app.listen(port, () => {
    console.log('server is up on port' + port)
})

/*
const jwt = require('jsonwebtoken')

const myFunction = async () => {
    const token = jwt.sign({_id: 'abc123'}, 'this ismynewcourse', {expiresIn: '1 seconds'})
    console.log(token)

    const data = jwt.verify(token, 'this ismynewcourse')
    console.log(data)
}

myFunction()
*/

/*
const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
    // const task = await Task.findById('5e47f6a9d1d8d8023c4c2647')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)
    
    
    
    const user = await User.findById('5e482e7aac135d21e01977a6')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}
main()
*/