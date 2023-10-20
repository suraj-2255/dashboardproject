const mongoose = require('mongoose')

const ChartSchema = mongoose.Schema(
    {
        name: { type: String },
        data: [{ label: { type: String }, value: { type: String } }],
    },
    { timestamp: true, collection: "chart" }
)

module.exports = mongoose.model("chart", ChartSchema)