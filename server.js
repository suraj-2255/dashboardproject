const express = require('express')
const app = express()
require('dotenv').config();
const PORT = process.env.PORT || 3000
const dbPORT = process.env.ATLAS_URL
const cors = require('cors')
const connectDB = require('./db/connection')
const router = require('./routes/router')


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const corsOptions = {
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

app.use(cors(corsOptions));

app.use(router)
connectDB(dbPORT)

app.listen(PORT, () => {
    console.log(`server start at http://localhost:${PORT}`)
})