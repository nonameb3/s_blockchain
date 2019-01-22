const Blockchain = require('../blockchain')
const Bitcoin = new Blockchain()

Bitcoin.createNewBlock(1255, 'jsdakldja12331sd7897', 'dasda121888')
Bitcoin.createNewTransaction(100, 'asdasd', 'asdad')
Bitcoin.createNewBlock(1256, 'jsdakldasd7897', 'dasdadasds8888')

Bitcoin.createNewTransaction(100, 'asdasd', 'asdad')
Bitcoin.createNewTransaction(100, 'asdasd', 'asdad')
Bitcoin.createNewTransaction(100, 'asdasd', 'asdad')
Bitcoin.createNewBlock(1256, 'jsd123dja8887d7897', 'dasd121238')

console.log(Bitcoin.createNewTransaction(100, 'asdasd', 'asdad'))
console.log(Bitcoin)
