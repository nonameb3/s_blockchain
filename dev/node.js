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

// ==================================
// local Route
// ==================================

// fect blockchain
app.get('/blockchain', (req, res) => {
  res.send(bitcoin)
})

// add newTransaction to padding
app.post('/transaction', (req, res) => {
  const newTransaction = req.body
  const blockIndex = bitcoin.addTransactionToPandingTransantion(newTransaction)
  res.json({ message: `This transaction will be added in block ${blockIndex}.` })
})

// receive new block
app.post('/receive-new-block', (req, res) => {
  const { newBlock } = req.body
  const lastBlock = bitcoin.getLastBlock()
  const isCorrectHash = lastBlock.hash === newBlock.previousBlockHash
  const isCorrectIndex = lastBlock.index + 1 === newBlock.index
  let message = ''

  if (isCorrectHash && isCorrectIndex) {
    bitcoin.chain = [...bitcoin.chain, newBlock]
    bitcoin.pendingTransaction = []
    message = 'New block received and accepted.'
  } else {
    message = 'New block rejected.'
  }

  res.json({ message, newBlock })
})

// register node to network
app.post('/register-node', (req, res) => {
  const { newNodeUrl } = req.body
  const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl
  const notAlreadyUrl = bitcoin.networkNodes.indexOf(newNodeUrl) === -1
  if (notCurrentNode && notAlreadyUrl) {
    bitcoin.networkNodes = [...bitcoin.networkNodes, newNodeUrl]
  }
  res.send({ message: 'New node registered successfully with node.' })
})

// register multiple nodes at one, (receive network node)
app.post('/register-node-bulk', (req, res) => {
  const { allnetworknode } = req.body
  allnetworknode.map(networkNode => {
    const notCurrentNode = bitcoin.currentNodeUrl !== networkNode
    const notAlreadyUrl = bitcoin.networkNodes.indexOf(networkNode) === -1
    if (notCurrentNode && notAlreadyUrl) {
      bitcoin.networkNodes = [...bitcoin.networkNodes, networkNode]
    }
  })
  res.send({ message: 'Bulk registered successfully.' })
})

// ==================================
// broadcast Route
// ==================================

// mine new Blockchain block and async to network
app.get('/mine', (req, res) => {
  const lastBlock = bitcoin.getLastBlock()
  const previousBlockHash = lastBlock['hash']
  const currentBlockData = {
    transaction: bitcoin.pendingTransaction,
    index: lastBlock['index'] + 1
  }
  const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData)
  const hash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce)
  const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, hash)

  let requirePromise = []
  bitcoin.networkNodes.map(networkNodeUrl => {
    const requireOption = {
      url: `${networkNodeUrl}/receive-new-block`,
      method: 'POST',
      body: { newBlock },
      json: true
    }
    requirePromise = [...requirePromise, rp(requireOption)]
  })

  Promise.all(requirePromise).then(() => {
    // reward for mine
    const requireOption = {
      url: `${bitcoin.currentNodeUrl}/transaction/broadcast`,
      method: 'POST',
      body: {
        amount: 12.5,
        seader: '00',
        recipient: nodeAddress
      },
      json: true
    }
    return rp(requireOption)
  }).then(() => {
    return res.json({
      massage: 'New block mine and broadcast successfully',
      block: newBlock
    })
  }).catch(e => res.send(e))
})

// add newTransaction Broadcast
app.post('/transaction/broadcast', (req, res) => {
  const { amount, seader, recipient } = req.body
  const newTransaction = bitcoin.createNewTransaction(amount, seader, recipient)
  bitcoin.addTransactionToPandingTransantion(newTransaction)

  let requirePromise = []
  bitcoin.networkNodes.map(networkNodeUrl => {
    const requestOption = {
      url: `${networkNodeUrl}/transaction`,
      method: 'POST',
      body: { newTransaction },
      json: true
    }
    requirePromise = [...requirePromise, rp(requestOption)]
  })

  Promise.all(requirePromise).then(data => {
    res.send({ message: 'Transaction created and broadcast successfully' })
  }).catch(error => {
    res.send(error)
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
      url: `${networkNodeUrl}/register-node`,
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
    res.json({ message: 'New node registered-broadcast with network successfully.' })
  }).catch(error => {
    console.error('/register-and-broadcast-node Promise error ' + error)
    res.send(error)
  })
})

// ckeck longest blockchain and replace this node
app.get('/concensus', (req, res) => {
  let requirePromise = []

  bitcoin.networkNodes.map(networkNodeUrl => {
    const requireOption = {
      url: `${networkNodeUrl}/blockchain`,
      method: 'GET',
      json: true
    }
    requirePromise = [...requirePromise, rp(requireOption)]
  })

  Promise.all(requirePromise).then(blockchains => {
    const currentChainLength = bitcoin.chain.length
    let maxChainLength = currentChainLength
    let newLongestChain = null
    let newPendingTransaction = null

    // find longest blockchain
    blockchains.map(blockchain => {
      if (blockchain.chain.length > maxChainLength) {
        maxChainLength = blockchain.chain.length
        newLongestChain = [...blockchain.chain]
        newPendingTransaction = [...blockchain.pendingTransaction]
      }
    })

    // replace longest to this chain
    if (!newLongestChain || (newLongestChain && !bitcoin.chainInValid(newLongestChain))) {
      res.json({
        message: 'Current chain has not been replaced.',
        chain: bitcoin.chain
      })
    } else {
      bitcoin.chain = [...newLongestChain]
      bitcoin.pendingTransaction = [...newPendingTransaction]
      res.json({
        message: 'This chain has been replaced',
        chain: newLongestChain
      })
    }
  })
})

// ==================================

app.listen(port, () => {
  console.log(`server start at port : ${port}`)
})
