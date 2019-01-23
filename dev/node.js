const express = require('express')
const bodyParser = require('body-parser')
const Blockchain = require('./blockchain')
const uuid = require('uuid')
const port = process.argv[2] || 3000
const rp = require('request-promise')

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
  const { newNodeUrl } = req.body
  if (bitcoin.networkNodes.indexOf(newNodeUrl) === -1) {
    bitcoin.networkNodes = [...bitcoin.networkNodes, newNodeUrl]
  }
  let regNodePromise = []
  bitcoin.networkNodes.map(networkNodeUrl => {
    const requestOption = {
      url: `${networkNodeUrl}/refister-node`,
      method: 'POST',
      body: { newNodeUrl: newNodeUrl },
      json: true
    }
    regNodePromise = [...regNodePromise, rp(requestOption)]
  })
  Promise.all(regNodePromise).then(data => {
    const bulkRegisterOption = {
      url: `${newNodeUrl}/register-node-bulk`,
      method: 'POST',
      body: { allnetworknode: [...bitcoin.networkNodes, bitcoin.currentNodeUrl] },
      json: true
    }
    return rp(bulkRegisterOption)
  }).then(data => {
    res.json({ message: 'New node registered with network successfully.' })
  }).catch(error => {
    console.error('/register-and-broadcast-node Promise error ' + error)
    res.send(error)
  })
})

// register a node with network
app.post('/register-node', (req, res) => {
  const { newNodeUrl } = req.body
  const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl
  const notAlreadyUrl = bitcoin.networkNodes.indexOf(newNodeUrl) === -1
  if (notCurrentNode && notAlreadyUrl) {
    bitcoin.networkNodes = [...bitcoin.networkNodes, newNodeUrl]
  } else {
    res.send({ message: 'New node already in network.' })
  }
  res.send({ message: 'New node registered successfully with node.' })
})

// register multiple nides at one
app.post('/register-node-bulk', (req, res) => {

})

app.listen(port, () => {
  console.log(`server start at port : ${port}`)
})
