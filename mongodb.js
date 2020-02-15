//CRUD operations

const { MongoClient, ObjectID } = require('mongodb')

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID


const id = new ObjectID()
// console.log(id)
// console.log(id.getTimestamp())

// console.log(id.id.length)

// console.log(id.toHexString().length)


const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {

    if (error) {
        return console.log("Unable to connect to database.")
    }

    const db = client.db(databaseName)

    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Vikram',
    //     age: 27,
    // },(error, results) => {
    //     if (error) {
    //         return console.log("Unable to insert user")
    //     }
    //     console.log(results.ops)

    // })

    // db.collection('users').insertMany([
    //     {
    //         name: "Jen",
    //         age: 27,
    //     }, {
    //         name: 'Gunther',
    //         age: 27
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log("Unable to insert documents")
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: "Find phone",
    //         completed: true,

    //     }, {
    //         description: 'Purchase phone',
    //         completed: false,

    //     }, {
    //         description: 'Play game',
    //         completed: false

    //     }
    // ], (error, results) => {
    //     if (error) {
    //         return console.log("Error occurred")
    //     }

    //     console.log(results.ops)

    // })

    // db.collection('users').findOne({_id: new ObjectID("5e3f0145b311e222ec5c6659") }, (error, user) => {
    //     if (error) {
    //         return console.log("unable to fetch")
    //     }
    //     console.log(user)
    // })


    // db.collection('users').find({age: 27}).count((error, user) => {
    //     console.log(user)
    // })
    // console.log("Connected")

    // db.collection('tasks').find({completed: false}).toArray((error, tasks) => {
    //     if(error) {
    //         console.log("*Unable to fetch")
    //     }
    //     console.log(tasks)
    // })


    // db.collection('tasks').updateOne({completed: true},{$set: {description: "Updated desc", completed: false}}, (error, result)=> {
    //     if(error)
    //         return console.log(error)
    //     console.log(result)
    // })


    // db.collection('users').updateOne({
    //     _id: new ObjectID('5e3eee295168963f7086d826')
    // }, {
    //     $inc: {
    //         age: 1
    //     }
    // }).then((result) => {
    //     console.log(result)

    // }).catch((error) => {
    //     console.log(error)
    // })


    // db.collection('tasks').updateMany({
    //     completed: true
    // }, {
    //     $set: {
    //         completed: false
    //     }
    // }).then(({modifiedCount}) => {
    //     console.log(modifiedCount)
    // }).catch((error) => {
    //     console.log(error)
    // })


    // db.collection('users').deleteMany({
    //     age: 27
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('tasks').deleteOne({
    //     description: 'Play game'
    // }).then(({deletedCount}) => {
    //     console.log(deletedCount)
    // }).catch((error) => {
    //     console.log(error)
    // })

})