const mongoose = require("mongoose");

const board2RevenueChartSchema = mongoose.Schema(

    {
        name: { type: String },
        data: [{ label: { type: String }, value: { type: Number } }],
    },

    { timestamps: true, collection: "chartboard" }
);

module.exports = mongoose.model("chartbord", board2RevenueChartSchema);


