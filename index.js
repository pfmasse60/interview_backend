const pool = require('./configs/dbConfig')
const express = require('express')
const serverless = require('serverless-http')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Handle pokemon GET route for all pokemon
app.get('/special/', (req, res) => {
	const query = `INSERT INTO pokemon_tb (first_name, last_name, city, email, state, phone, zip) VALUES ('Pete', 'Masse', 'Bozeman', 'p@mail.com', 'Montana', '406', '59718')`

	pool.query(query, (err, results, fields) => {
    if (err) {
      const response = { data: null, message: err.message, }
      res.send(response)
    }
  })
});

// Handle in-valid route
app.all('*', function(req, res) {
  const response = { data: null, message: 'Route not found!!' }
  res.status(400).send(response)
})

// wrap express app instance with serverless http function
module.exports.handler = serverless(app)
