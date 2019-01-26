const express = require('express')
const router = express.Router()
let bitcoin = null

// ======================================
//                Route
// ======================================
router.get('/block/:hashId', (req, res) => {
  const blockHashId = req.params.hashId
  const blockByHash = bitcoin.getBlockByHash(blockHashId)
  res.json({ block: blockByHash })
})

router.get('/transaction/:transactionId', (req, res) => {
  const transactionId = req.params.transactionId
  const { transaction, block } = bitcoin.getTransaction(transactionId)
  res.json({ transaction, block })
})

router.get('/address/:addressId', (req, res) => {

})

// ======================================

module.exports = function (blockchain) {
  bitcoin = blockchain
  return router
}
