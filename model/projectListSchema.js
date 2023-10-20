const mongoose = require('mongoose')

const projectListSchema = mongoose.Schema(
    {
        cust: {
            data: Buffer,
            contentType: String,
        },
        project: {
            type: String,
            required: true
        },
        assighnto: {
            type: String,
            required: true
        },
        asignDate: {
            type: String,
            required: true
        },
        team: [
            {
                data: Buffer,
                contentType: String,
            },
        ],
        priority: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        cost: {
            type: String,
            required: true
        },
    }, { timestamp: true, collection: "project_detail" }
);
module.exports = mongoose.model("project_detail", projectListSchema);
