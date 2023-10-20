const mongoose = require('mongoose')


const connectDB = async (dbPORT) => {
    try {

        await mongoose.connect(dbPORT)
        console.log("db connect")
    }
    catch (error) {
        console.log(error)
    }
}
module.exports = connectDB