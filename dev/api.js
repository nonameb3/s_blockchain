const express = require('express')
const bodyParser = require('body-parser')
const Blockchain = require('./blockchain')

const app = express()
const bitcoin = new Blockchain()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// fect blockchain
app.get('/blockchain', (req, res) => {
  res.send(bitcoin)
})

// add newTransaction
app.post('/transaction', (req, res) => {
  res.send(`send ${req.body.amount} bitcoin`)
})

// mine Blockchain
app.get('/mine', (req, res) => {

})

app.listen(3000, () => {
  console.log('server start at port : 3000')
})
