const mongoose = require('mongoose')
const crypto = require('crypto')
// const { date } = require('joi')
const user_personal_Schema = mongoose.Schema({
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Mobile: { type: Number, required: true },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    confirmPassword: { type: String },
    Location: { type: String },
    Birthday: { type: String },
    Facebook: { type: String },
    Twitter: { type: String },
    Education: { type: String },
    Experience: { type: String },
    Skills: { type: String },
    token: { type: String, default: "" },
    tokenExpiration: Date
},
    { timestamps: true, collection: "user_detail" },
)




module.exports = mongoose.model("user_detail", user_personal_Schema)