const mongoose = require('mongoose')



const dashboardSchema = mongoose.Schema(
    {
        title: {
            type: String
        },
        value: {
            type: Number
        },
        sliderValue: {
            type: Number
        }
    }
    ,
    { timestamps: true, collection: "dashboard" }
)

module.exports = mongoose.model("dashboard", dashboardSchema)
