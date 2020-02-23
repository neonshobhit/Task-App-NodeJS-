const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/user')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'xaba@getnada.com',
    password: 'mike@example.com',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

// afterEach(() => {
//     console.log("After each")
// })

test('Should sign up a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Shobhit',
        email: 'shobhitmaheshwari18@gmail.com',
        password: 'shobhitmaheshwari'
    }).expect(201)

    //Assert that the database was changed successfully

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    //Assertion about the response


    //response.body.user.name
    expect(response.body).toMatchObject({
        user: {
            name: 'Shobhit',
            email: 'shobhitmaheshwari18@gmail.com'
        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe('shobhitmaheshwari')
})

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    //Check if the token is saved into database
    const user = await User.findById(userOneId)
    expect(response.body).toMatchObject({
        token: user.tokens[1].token
    })
})

test('should fail because of authentication problem', async () => {
    await request(app).post('/users/login').send({
        email: 'Sjhscw@wzs.com',
        password: 'nsajcnsdcbsbd'
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Delete a user', async () => {
    const response = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()

})

test('Should fail deleting a user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'test/fixtures/profile-pic.jpg')
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Jess'
        })
        //.attach('avatar', 'test/fixtures/profile-pic.jpg')
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.name).toEqual('Jess')

})

test('Should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Jaipur'
        })
        //.attach('avatar', 'test/fixtures/profile-pic.jpg')
        .expect(400)

})