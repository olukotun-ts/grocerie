// Dependencies
// ============
var express = require('express')
var parser = require('body-parser')

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
app.use(parser.text())
app.use(parser.urlencoded({extended: true}))

app.listen(port, host, (request, response) => {
  console.log(`Listening on ${host}:${port}...`)
})

app.get('/', (request, response) => {
  response.render('index')
})

app.post('/', (request, response) => {
  // @todo: Send proper response.
})
