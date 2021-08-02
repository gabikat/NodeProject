const express = require('express')
const app = express()
const players = require('./routes/players')
const errorAPI = require('./middleware/error-handler')
const errorRoute = require('./middleware/basic-404')
const connectDB = require('./db/connect')
require('dotenv').config()

// middleware
app.use(express.json())

// routes
app.use('/api/players', players)
app.use(errorAPI)
app.use(errorRoute)

const port = process.env.POST || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    }
    catch (error) {
        console.log(error)
    }
}

start()