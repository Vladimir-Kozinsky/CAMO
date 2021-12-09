const express = require('express')
const mongoose = require('mongoose')
const router = require('./router')

const PORT = 4000
const DB_URL = "mongodb+srv://user1:user1@cluster0.x1e9h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const app = express()
app.use(express.json())
app.use('/aircraft', router)


async function startApp() {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => {
            console.log(`Server has been started on ${PORT}...`)
        })
    } catch (error) {
        console.log(error)
    }
}

startApp()

