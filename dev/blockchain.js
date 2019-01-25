const sha256 = require('sha256')
const currentNodeURL = process.argv[3] || 'http://localhost:3000'
const uuid = require('uuid')

function Blockchain () {
  this.chain = []
  this.pendingTransaction = []
  this.currentNodeUrl = currentNodeURL
  this.networkNodes = []
  this.createNewBlock(100, '0', '0')
}

Blockchain.prototype.createNewBlock = function (nonce, previousBlockHash, hash) {
  const newBlock = {
    index: this.chain.length + 1,
    timestamp: Date.now(),
    transaction: this.pendingTransaction,
    nonce: nonce,
    hash: hash,
    previousBlockHash: previousBlockHash
  }

  this.pendingTransaction = []
  this.chain = [...this.chain, newBlock]
  return newBlock
}

Blockchain.prototype.getLastBlock = function () {
  return this.chain[this.chain.length - 1]
}

Blockchain.prototype.createNewTransaction = function (amount, sender, recipient) {
  const newTransaction = {
    amount,
    sender,
    recipient,
    transactionId: uuid().split('-').join('')
  }
  return newTransaction
}

Blockchain.prototype.addTransactionToPandingTransantion = function (transactionOj) {
  this.pendingTransaction = [...this.pendingTransaction, transactionOj]
  return this.getLastBlock()['index'] + 1
}

Blockchain.prototype.hashBlock = function (previousBlockHash, currentBlockData, nonce) {
  const dataAsString = `${previousBlockHash}${nonce.toString()}${JSON.stringify(currentBlockData)}`
  const hash = sha256(dataAsString)

  return hash
}

Blockchain.prototype.proofOfWork = function (previousBlockHash, currentBlockData) {
  let nonce = 0
  let hash = ''
  while (hash.substring(0, 4) !== '0000') {
    nonce++
    hash = this.hashBlock(previousBlockHash, currentBlockData, nonce)
  }

  return nonce
}

Blockchain.prototype.chainInValid = function (blockchain) {
  let inValid = true

  for (let i = 1; i < blockchain.length; i++) {
    const currentBlockData = blockchain[i]
    const previousBlocData = blockchain[i - 1]
    const { index, transaction } = currentBlockData
    const currentBlockHash = this.hashBlock(previousBlocData.hash, { transaction, index }, currentBlockData.nonce)
    if (currentBlockHash.substring(0, 4) !== '0000') inValid = false
    if (currentBlockData.hash !== previousBlocData.previousBlockHash) inValid = false
  }

  const { nonce, hash, previousBlockHash, transaction } = blockchain[0]
  if (nonce !== 100 || hash !== '0' || previousBlockHash !== '0' || transaction.length !== 0) {
    inValid = false
  }

  return inValid
}

module.exports = Blockchain
