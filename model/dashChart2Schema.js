const mongoose = require('mongoose')


const dachChart2Schema = mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "userSchema" },
    percent: { type: String }

},
    {
        timestamp: true, colleection: "chart2",
    }
)

module.exports = mongoose.model("chart2", dachChart2Schema)