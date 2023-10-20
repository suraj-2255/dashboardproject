const mongoose = require('mongoose')

const fourRoSchema = mongoose.Schema(
    {
        name: { type: String },
        data: [{ label: { type: String }, value: { type: Number } }],
    },

    { timestamps: true, collection: "chrt3" }
);
module.exports=mongoose.model("chrt3",fourRoSchema)