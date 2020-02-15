const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/tasks-manager-api', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})



// const me = new User({
//     name: " Andrew  ",
//     age: 20,
//     email: ' MYEMAIL@mead.io',
//     password: 'word'
// })

// me.save().then(() => {
//     console.log(me)

// }).catch((error) => {
//     console.log(error)

// })





// new Tasks({
//     description: "Say Hello to mom",
//     completed: false
// }).save().then((data) => {
//     console.log(data)
// }).catch((error) => {
//     console.log(error)
// })


