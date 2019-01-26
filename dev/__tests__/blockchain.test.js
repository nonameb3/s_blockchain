/*eslint-disable */
const Blockchain = require('../blockchain')
const blockchainOj = require('././blockOj')
const Bitcoin = new Blockchain()
const BitcoinOj = blockchainOj

console.log(Bitcoin.chainInValid(blockchainOj.chain))

// test proof of work
// ================================
// const previousBlockHash = 'asdasdasd'
// const currentBlockData = [ {
//   amount: 100, sender: 'aa', recipient: 'bb'
// }, {
//   amount: 300, sender: 'aa', recipient: 'bb'
// }]

// console.log(Bitcoin.proofOfWork(previousBlockHash, currentBlockData))
// console.log(Bitcoin.hashBlock(previousBlockHash, currentBlockData, 46498))

// test transaction and new block
// ===============================
// Bitcoin.createNewBlock(1255, 'jsdakldja12331sd7897', 'dasda121888')
// Bitcoin.createNewTransaction(100, 'asdasd', 'asdad')
// Bitcoin.createNewBlock(1256, 'jsdakldasd7897', 'dasdadasds8888')

// Bitcoin.createNewTransaction(100, 'asdasd', 'asdad')
// Bitcoin.createNewTransaction(100, 'asdasd', 'asdad')
// Bitcoin.createNewTransaction(100, 'asdasd', 'asdad')
// Bitcoin.createNewBlock(1256, 'jsd123dja8887d7897', 'dasd121238')
// console.log(Bitcoin)
