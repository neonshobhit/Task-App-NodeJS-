require('../src/db/mongoose')
const Task = require('../src/models/task')
/*
Task.findByIdAndDelete('5e41ae945924a43f24a22b38').then((task) => {
    console.log(task)
    return Task.countDocuments({completed: true})
}).then((incompletedTasks) => {
    console.log(incompletedTasks)
}).catch((e)=> {
    console.log(e);
})

*/

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    console.log(task)
    const count = await Task.countDocuments({completed: true})
    return count
}


deleteTaskAndCount('5e41a7a186f2953048fa52d2').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})