const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv/config')
const path = require('path')

const user = require('./app/routes/user')
const group = require('./app/routes/group')
const task = require('./app/routes/task')
const comment = require('./app/routes/comment')
const authenticate = require('./app/routes/authenticate')

// express
const app = express()
const port = process.env.PORT || 3000

if (process.env.NODE_ENV == 'production') {
    app.use(express.static(path.resolve(__dirname, '../../dist')))
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve('index.html'))
    })
}

// connect to mongodb
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => console.log('connected to db...'))
    .catch(error => console.log('error', error))

app.listen(port, console.log(`Listening at port ${port}...`))

app.get('/', (req, res) => {
    res.send('Hello World')
})

// Middleware
app.use(cors(), bodyParser.json())

app.use('/users', user)
app.use('/groups', group)
app.use('/tasks', task)
app.use('/comments', comment)
app.use('/authenticate', authenticate)