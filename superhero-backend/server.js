require('dotenv').config()

const express = require('express')
const app = express()
var cors = require('cors')
app.use(cors())
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const superherosRouter = require('./routes/superhero.routes')
app.use('/superheros', superherosRouter)

app.listen(3000, () => console.log('Server Started')) 