require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('680e153cc8204b25c46cbf82',{description:'clean the house'}).then((task)=>{
//     console.log(task)
//     return Task.countDocuments({completed : 'false'})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed : false})
    return count
}

deleteTaskAndCount('680e0f52e90fb7e9379e3cb0').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log('e : ' , e)
})