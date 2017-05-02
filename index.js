// Dependencies
// ============
var express = require('express')
var mongoose = require('mongoose')
var parser = require('body-parser')

// Fire up database.
// =================
mongoose.connect('mongodb://localhost/groceriedb')
var db = mongoose.connection
db.on('error', console.error.bind(console, 'Error connecting to database'))
db.once('open', () => {
  console.log('Connected to database.')
})

// Define db model.
// ================
var itemSchema = mongoose.Schema({
  name: String,
  status: Boolean
})

var Item = mongoose.model('Item', itemSchema)

// var item = new Item
// item.name = 'banana'
// item.status = true
// item.save(() => {
//   console.log('Seeded database.')
// })

// Server stuff.
// =============
var port = 3000
var host = '127.0.0.1'

var logRequest = (request, response, next) => {
  /* Middleware that logs what type of request came in.
  */
  console.log(`Serving ${request.method} request...`)
  next()
}

var app = express()

app.set('views', __dirname)
app.set('view engine', 'ejs')

app.use(logRequest)
app.use(parser.json({strict: false}))

app.listen(port, host, (request, response) => {
  console.log(`Listening on ${host}:${port}...`)
})

// Routing and handling.
// =====================
app.get('/', (request, response) => {
  response.render('index')
})

app.post('/', (request, response) => {
  // @todo: Send proper response.
  console.log('Request body on POST:', request.body)
})
