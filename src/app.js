const express = require('express')
const app = express()
const path = require('path')
const morgan = require('morgan')

// Settings
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))

// Routes
app.use(require('./routes/index'))
app.use((req, res) => {
  res.status(404).send({
    status: 404,
    statusCode: 'Not found',
    message: 'The server can not find the requested resource'
  })
})

// Static
app.use(express.static(__dirname + '/public'))

module.exports = app
