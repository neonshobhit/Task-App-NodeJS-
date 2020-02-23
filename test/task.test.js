const request = require('supertest')
const Task = require('../src/models/task')
const app = require('../src/app')
const { userOneId,
    userOne,
    setupDatabase,
    userTwo,
    userTwoId,
    taskOne,
    taskTwo,
    taskThree,
} = require('./fixtures/db')



beforeEach(setupDatabase)

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'From my test'
        })
        .expect(201)
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})

test('Should fetch user tasks', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    expect(response.body.length).toBe(2)
})

test('SHould fail to delete unauthorised users', async () => {
    const response = await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)
    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
})

test('Should not create task wth invalid description', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send({
            description: false,
        })
        .expect(201)
    const task = await Task.findById(response.body._id)
    expect(task.description).toEqual(expect.any(String))
})

test('Should not create task wth invalid completed', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send({
            completed: 'false',
        })
        .expect(400)
    // const task = await Task.findById(response.body._id)
    // expect(task.description).toEqual(expect.any(String))
})

test('Should not update task wth invalid description', async () => {
    const response = await request(app)
        .patch(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: false,
        })
        .expect(200)
    const task = await Task.findById(response.body._id)
    expect(task.description).toEqual(expect.any(String))
})

test('Should not update task wth invalid completed', async () => {
    const response = await request(app)
        .patch(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            completed: 'hello',
        })
        .expect(400)
    // const task = await Task.findById(response.body._id)
    // expect(task.description).toEqual(expect.any(String))
})

test('Should delete user task', async () => {
    await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const task = await Task.findById(taskOne._id)
    expect(task).toBeNull()
})

test('Should ot delete if not authenticated', async () => {
    await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .send()
        .expect(401)

    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
})

test('Should not update other users task', async () => {
    await request(app)
        .patch(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send({
            completed: true
        })
        .expect(404)
})

test('Should fetch users task by id', async () => {
    await request(app)
        .get(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should no fetch users task by id if not authenticated', async () => {
    await request(app)
        .get(`/tasks/${taskOne._id}`)
        .send()
        .expect(401)
})

test('Should not fetch other users task by id', async () => {
    await request(app)
        .get(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)
})

test('Should fetch only completed task', async () => {
    const response = await request(app)
        .get(`/tasks?completed=true`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(200)
    const incomplete = response.body.filter((task) => task.completed !== true)
    expect(incomplete.length).toBe(0)
})

test('Should fetch only incomplete task', async () => {
    const response = await request(app)
        .get(`/tasks?completed=false`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(200)
    const complete = response.body.filter((task) => task.completed === true)
    expect(complete.length).toBe(0)
})

test('Should sort tasks by description', async () => {
    const response = await request(app)
        .get(`/tasks?sortBy=description:asc`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    // How to assert that obtained result is sorted?
    expect(response.body[0].description).toBe('First Task')

})

test('Should sort tasks by completed', async () => {
    const response = await request(app)
        .get(`/tasks?sortBy=completed:asc`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    // How to assert that obtained result is sorted?
    expect(response.body[0].description).toBe('First Task')

})

test('Should sort tasks by completed', async () => {
    const response = await request(app)
        .get(`/tasks?sortBy=createdAt:asc`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    // How to assert that obtained result is sorted?
    expect(response.body[0].description).toBe('First Task')

})

test('Should sort tasks by completed', async () => {
    const response = await request(app)
        .get(`/tasks?sortBy=updatedAt:asc`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    // How to assert that obtained result is sorted?
    expect(response.body[0].description).toBe('First Task')

})

test('Should fetch page of tasks', async () => {
    const response = await request(app)
        .get(`/tasks?skip=1`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    
    expect(response.body[0].description).toBe('Second Task')
})