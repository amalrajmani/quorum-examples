const assert = require('assert')
const Web3 = require('web3')
const cfg = require("./config")
const logger = require('tracer').console({level:'warn'})



async function sendPrivateTransaction(nodeIndex) {
    logger.info("start testing in NODE"+nodeIndex + "...")
    const amount = 0
    const accts = cfg.accounts()
    const nodeName = cfg.nodes()[nodeIndex]
    const web3 = new Web3(new Web3.providers.HttpProvider(nodeName))
    const eth = web3.eth
    const fromAcct = accts[nodeIndex]
    var blockNumber = 0
    var newBlockNumber = 0
    var toAcct = ""
    var fromAcctBal = 0
    var toAcctBal = 0
    var fromAcctBalAfterTransfer = 0
    var toAcctBalAfterTransfer = 0
    var constellationId = ""

    for(var n=1; n < accts.length; ++n) {
        if(n == nodeIndex) continue
        logger.debug("NODE"+nodeIndex + " -> " + n)
        toAcct = accts[n]
        logger.debug("send private transaction from account in node"+nodeIndex+" to account in node" + n + "...")
        fromAcctBal = await eth.getBalance(fromAcct)
        toAcctBal = await eth.getBalance(toAcct)
        blockNumber = await eth.getBlockNumber()
        constellationId = cfg.constellations()[n]
        logger.debug("fromAcct:" + fromAcct + " fromAcctBal:" + fromAcctBal + " toAcct:" + toAcct + " toAcctBal:" + toAcctBal + " blockNumber:" + blockNumber)
        var txHash = await eth.sendTransaction({from:fromAcct,to:toAcct,value:amount, privateFor:[constellationId]})
        logger.debug("txHash:" + txHash.blockHash)
        cfg.sleep(300)
        var txReciept = await eth.getTransactionReceipt(txHash.transactionHash)
        logger.debug("txReciept:"+txReciept)
        fromAcctBalAfterTransfer = await eth.getBalance(fromAcct)
        toAcctBalAfterTransfer = await eth.getBalance(toAcct)
        newBlockNumber = txReciept.blockNumber

        logger.debug("fromAcct:" + fromAcct + " fromAcctBal:" + fromAcctBalAfterTransfer + " toAcct:" + toAcct + " toAcctBal:" + toAcctBalAfterTransfer + " blockNumber:" + newBlockNumber)
        assert.notEqual(blockNumber, newBlockNumber, "block number not changed")
        assert.notEqual(txHash.blockHash, "", "txHash block hash is empty")

        logger.debug("send private transaction from account in node"+nodeIndex+" to account in node" + n + " done")
    }
    logger.info("finished testing in NODE"+nodeIndex)
    return true
}

async function sendPrivateTransactionInParallel(){
    var promises = []
    var resArr = []
    for(var j = 1; j <=7; ++j){
        promises[promises.length] = new Promise( async function (res,rej) {
            try{
                logger.debug("started for node " + j)
                var r = await sendPrivateTransaction(j)
                logger.debug("finished for node " + j)
                res(r)
            }catch (e) {
                rej(e)
            }

        })
    }
    logger.debug("waiting for promises to be resolved...")
    var res = await Promise.all(promises)
    logger.debug("promises resolved ==> "+res)
    return res
}


describe("test PrivateSendTransaction in parallel", function () {
    it('run in parallel across node1 to node7', async () => {
        logger.debug("start resolve ==>")
        var res = await sendPrivateTransactionInParallel()
        assert.equal(res.length, 7, "test failed in some nodes")
        logger.debug("final resolve ==>"+res)
    })
})


describe("test PrivateSendTransaction in sequence", function () {

    describe('sendTransaction', function () {
        it('from node1', async  () => {

            var res = await sendPrivateTransaction(1)
            assert.equal(res, true)

        })
    })

    describe('sendTransaction', function () {
        it('from node2', async  () =>  {

            var res = await sendPrivateTransaction(2)
            assert.equal(res, true)
        })
    })

    describe('sendTransaction', function () {
        it('from node3', async  () =>  {

            var res = await sendPrivateTransaction(3)
        assert.equal(res, true)
        })
    })

    describe('sendTransaction', function () {
        it('from node4', async  () =>  {

            var res = await sendPrivateTransaction(4)
        assert.equal(res, true)
        })
    })

    describe('sendTransaction', function () {
        it('from node5', async  () =>  {

            var res = await sendPrivateTransaction(5)
        assert.equal(res, true)
        })
    })

    describe('sendTransaction', function () {
        it('from node6', async  () =>  {

            var res = await sendPrivateTransaction(6)
        assert.equal(res, true)
        })
    })

    describe('sendTransaction', function () {
        it('from node7', async  () =>  {

            var res = await sendPrivateTransaction(7)
        assert.equal(res, true)
        })
    })

})


