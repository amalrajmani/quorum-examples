const EthereumTx = require('ethereumjs-tx')
const keythereum = require("keythereum")
const fs = require('fs')
const assert = require('assert')
const Web3 = require('web3')
const cfg = require("./config")
const util = require("./util")
const logger = require('tracer').console({level:cfg.logLevel()})


async function testSignedTransactionFromNode(nid) {
    for (t = 1; t <= 7; ++t) {
        if (nid != t)
            await sendSignedTransaction(nid, t)
    }
    return true
}

async function sendSignedTransaction(fromNodeId, toNodeId) {
    assert.notEqual(fromNodeId, toNodeId, "from node and to node should be different")
    logger.info("send signed transaction from account in node" + fromNodeId + " to node" + toNodeId)
    const baseKeyPath = cfg.basePath()
    const keyFile = baseKeyPath + "key" + fromNodeId
    const nodeName = cfg.nodes()[fromNodeId]
    const toAcct = cfg.accounts()[toNodeId]
    logger.info('using node', fromNodeId)
    //connect to block chain
    var web3 = new Web3(new Web3.providers.HttpProvider(nodeName))

    const keyJSON = fs.readFileSync(keyFile, 'utf8')
    const keyObj = JSON.parse(keyJSON)
    const password = ''
    const privateKey = keythereum.recover(password, keyObj)

    logger.info('privateKey of account from node: ', privateKey.toString('hex'))

    const fromAcctArr = await web3.eth.getAccounts()
    const fromAcct = fromAcctArr[0]
    logger.info('from account: ', fromAcct)

    var nonce = await web3.eth.getTransactionCount(fromAcct)

    var blockNumber = 0
  // logger.info('nonce: ', nonce)
  // var hexString = nonce.toString(16)
  // var newnonce = '0x0'+ hexString
  // logger.info(newnonce)



    let txParams = {
        // nonce: '0x0'+nonce,
      nonce: '0x0'+ nonce.toString(16),
        gasPrice: '0x0',
        gasLimit: '0x47b760',
        to: toAcct,
        value: '0x05',
        chainId: 123,
    }

    logger.info('tx payload: ', txParams)


    const tx = new EthereumTx(txParams)

    tx.sign(privateKey)
    const serializedTx = tx.serialize()
    var rawTx = '0x' + tx.serialize().toString('hex')
    logger.info('raw transaction: ', rawTx)
    blockNumber = await web3.eth.getBlockNumber()
    var sentTx = await web3.eth.sendSignedTransaction(rawTx)
    logger.info("txnObj:" + sentTx.transactionHash)


    util.sleep(cfg.processingTime())
    var txnObj = await web3.eth.getTransaction(sentTx.transactionHash)
    logger.info("txn is successful, transactionHash:"+ txnObj.blockHash)
    assert.notEqual(txnObj.blockHash, "", "invalid block hash")
    assert.notEqual(txnObj.blockNumber, 0, "block number is not valid")
    assert.notEqual(txnObj.blockNumber, blockNumber, "block number has not changed")
    assert.equal(txnObj.from, fromAcct, "from account is not matching")
    logger.info("---------------------------------------------------------")
    return true
}



describe("signed transaction", function () {

    describe("send signed transaction from node1 to other nodes", function (){
        it('should send signed transaction to other nodes', async function () {
            var res = await testSignedTransactionFromNode(1)
            assert.equal(res, true)
        })
    })

    describe("send signed transaction from node2 to other nodes", function (){
        it('should send signed transaction to other nodes', async function () {
            var res = await testSignedTransactionFromNode(2)
            assert.equal(res, true)
        })
    })

    describe("send signed transaction from node3 to other nodes", function (){
        it('should send signed transaction to other nodes', async function () {
            var res = await testSignedTransactionFromNode(3)
            assert.equal(res, true)
        })
    })

    describe("send signed transaction from node4 to other nodes", function (){
        it('should send signed transaction to other nodes', async function () {
            var res = await testSignedTransactionFromNode(4)
            assert.equal(res, true)
        })
    })

    describe("send signed transaction from node5 to other nodes", function (){
        it('should send signed transaction to other nodes', async function () {
            var res = await testSignedTransactionFromNode(5)
            assert.equal(res, true)
        })
    })

    describe("send signed transaction from node6 to other nodes", function (){
        it('should send signed transaction to other nodes', async function () {
            var res = await testSignedTransactionFromNode(6)
            assert.equal(res, true)
        })
    })

    describe("send signed transaction from node7 to other nodes", function (){
        it('should send signed transaction to other nodes', async function () {
            var res = await testSignedTransactionFromNode(7)
            assert.equal(res, true)
        })
    })


})
