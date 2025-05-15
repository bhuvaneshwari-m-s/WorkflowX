require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('680e0f52e90fb7e9379e3cb0' , {name : 'Bhuvaneshwari'}).then((user) => {
//     console.log(user)
//     return User.countDocuments({name : 'Bhuvaneshwari'})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async (id , name) => {
    const user = await User.findByIdAndUpdate(id , { name })
    const count = await User.countDocuments({name})
    return user
}

updateAgeAndCount('680e0f52e90fb7e9379e3cb0', 'Ganesha').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})