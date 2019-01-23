const express = require('express')
const bodyParser = require('body-parser')
const Blockchain = require('./blockchain')
const uuid = require('uuid')
const port = process.argv[2] || 3000

const app = express()
const bitcoin = new Blockchain()
const nodeAddress = uuid().split('-').join('')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// fect blockchain
app.get('/blockchain', (req, res) => {
  res.send(bitcoin)
})

// add newTransaction
app.post('/transaction', (req, res) => {
  const { amount, sender, recipient } = req.body
  const blockIndex = bitcoin.createNewTransaction(amount, sender, recipient)
  res.json({ message: `This transaction will be added in block ${blockIndex}.` })
})

// mine Blockchain
app.get('/mine', (req, res) => {
  const lastBlock = bitcoin.getLastBlock()
  const previousBlockHash = lastBlock['hash']
  const currentBlockData = {
    transaction: bitcoin.pendingTransaction,
    index: lastBlock['index'] + 1
  }
  const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData)
  const hash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce)
  bitcoin.createNewTransaction(12.5, '00', nodeAddress) // reward
  const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, hash)
  return res.json({
    massage: 'New block mine successfully',
    block: newBlock
  })
})

// register a node and broadcast it in the network
app.post('/register-broadcast-node', (req, res) => {

})

// register a node with network
app.post('/register-node', (req, res) => {

})

// register multiple nides at one
app.post('/register-node-bulk', (req, res) => {

})

app.listen(port, () => {
  console.log(`server start at port : ${port}`)
})
