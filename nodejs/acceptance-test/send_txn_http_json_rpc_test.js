const assert = require('assert')
const cfg = require("./config")
const Web3 = require('web3')
const util = require("./util")
const req = require("request")
const logger = require('tracer').console({level:cfg.logLevel()})

/*
This test case covers the following scenario:
Send private transaction for smart contract is tested via the HTTP JSON RPC call.
Send transaction with valid from account and to account are tested.
With valid account it should create a new block and with invalid account it should not create block.

TODO: the RPC should return txn hash when successful but its returning {"jsonrpc":"2.0","id":67,"result":null} always. change assertion to check txn hash
 */



async function sendTransactionCall(nodeName, fromAccount){
    var url = nodeName
    req({
        url: url,
        json: {"jsonrpc":"2.0", "method":"eth_sendTransactionAsync", "params":[{"from":fromAccount, "data": "0x6060604052341561000f57600080fd5b604051602080610149833981016040528080519060200190919050505b806000819055505b505b610104806100456000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680632a1afcd914605157806360fe47b11460775780636d4ce63c146097575b600080fd5b3415605b57600080fd5b606160bd565b6040518082815260200191505060405180910390f35b3415608157600080fd5b6095600480803590602001909190505060c3565b005b341560a157600080fd5b60a760ce565b6040518082815260200191505060405180910390f35b60005481565b806000819055505b50565b6000805490505b905600a165627a7a72305820d5851baab720bba574474de3d09dbeaabc674a15f4dd93b974908476542c23f00029000000000000000000000000000000000000000000000000000000000000002a", "gas": "0x47b760", "privateFor": ["ROAZBWtSacxXQrOe3FGAqJDyJjFePR5ce4TSIzmJ0Bc="]}], "id":67} ,
        method: 'POST',
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            logger.info("Success:"+body)
        }
        else {
            assert.equal(error, null, "error " + error)
            logger.info("error: " + error)
            logger.info("response.statusCode: " + response.statusCode)
            logger.info("response.statusText: " + response.statusText)
        }
    })
}

async function sendTransactionCallWithValidAccount(){
    const nodeName = cfg.nodes()[parseInt("1")]

    var web3 = new Web3(new Web3.providers.HttpProvider(nodeName))
    var blockNumberBefore = await web3.eth.getBlockNumber()

    sendTransactionCall(nodeName, "0xed9d02e382b34818e88b88a309c7fe71e65f419d")

    await util.sleep(1000)

    var blockNumberAfter = await web3.eth.getBlockNumber()

    logger.info("block number before=" + blockNumberBefore)
    logger.info("block number after=" + blockNumberAfter)
    assert.notEqual(blockNumberBefore, blockNumberAfter, "new block not created")

    return true
}


async function sendTransactionCallWithInValidAccount(){
    const nodeName = cfg.nodes()[parseInt("1")]

    var web3 = new Web3(new Web3.providers.HttpProvider(nodeName))
    var blockNumberBefore = await web3.eth.getBlockNumber()

    sendTransactionCall(nodeName, "0xeed9d02e382b34818e88b88a309c7fe71e65f419d")

    await util.sleep(1000)

    var blockNumberAfter = await web3.eth.getBlockNumber()

    logger.info("block number before=" + blockNumberBefore)
    logger.info("block number after=" + blockNumberAfter)
    assert.equal(blockNumberBefore, blockNumberAfter, "new block not created")

    return true
}





describe("call send transaction via http request JSON RPC request", function () {

    it('should accept transaction and create new block if from account is valid', async () => {
        var res =  await sendTransactionCallWithValidAccount()
    })

    it('should not accept transaction and create new block if from account is invalid', async () => {
        var res =  await sendTransactionCallWithInValidAccount()
    })

})

