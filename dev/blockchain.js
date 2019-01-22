function Blockchain () {
  this.chain = []
  this.pendingTransaction = []
}

Blockchain.prototype.createNewBlock = function (nonce, previousBlockHash, has) {
  const newBlock = {
    index: this.chain.length + 1,
    timestamp: Date.now(),
    transaction: this.pendingTransaction,
    nonce: nonce,
    has: has,
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
    amount, sender, recipient
  }

  this.pendingTransaction = [...this.pendingTransaction, newTransaction]
  return this.getLastBlock()['index'] + 1
}

module.exports = Blockchain
