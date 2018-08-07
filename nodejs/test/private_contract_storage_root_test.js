const assert = require('assert')
const cfg = require("./config")
const util = require("./util")
const cp = require("child-process-promise")
const cp1 = require("child-process-promise")
const logger = require('tracer').console({level:cfg.logLevel()})
var storageRootArr = {}
const fromNodeId="1"
const toNodeId="7"

async function testStorageRoot(){

    var cmd = 'geth attach --exec \'loadScript(\"private-contract.js\")\' ipc:'+cfg.qdataPath()+'/dd'+fromNodeId+'/geth.ipc'
    var contractAddress = ""
    logger.debug("exec process: " + cmd)
    await cp.exec(cmd).then(async (result) => {
        var err = result.err
        var stdout = result.stdout
        if (err) {
            logger.log(err);
            logger.log("private contract creation failed")
            return false;
        }
        var msg = stdout
        if(msg.indexOf("success:") != -1){
            //logger.log("storage root:" + msg)
            var pat = "TransactionHash:["
            var i0 = msg.indexOf(pat)
            var i1 = i0 + pat.length
            var i2 = msg.indexOf("]",i1)
            contractAddress = msg.substring(i1,i2)


            logger.debug("transaction hash:" + contractAddress)
            await getStorageRootFromNode(fromNodeId, contractAddress)
            await getStorageRootFromNode("3", contractAddress)
            await getStorageRootFromNode(toNodeId, contractAddress)


            logger.debug("m n1StrgRoot="+storageRootArr[fromNodeId])
            logger.debug("m n3StrgRoot="+storageRootArr["3"])
            logger.debug("m n7StrgRoot="+storageRootArr[toNodeId])
        }
    }).catch(function (err) {
        console.error('ERROR: ', err);
    });

    logger.log("before r1")
    return true
}

async function getStorageRootFromNode(nodeId, contractAddress){
    var cmd = './storage-root.sh ' + nodeId +" " + contractAddress
    storageRootArr[nodeId] = null
    logger.log("1.exec process: " + cmd)
    await cp1.exec(cmd).then(function (result) {
        var err = result.err
        var stdout = result.stdout
        if (err) {
            logger.error(err);
            logger.error("getting contract storage failed")
            return null;
        }
        var msg = stdout
        var e1 = msg.indexOf("Error: invalid address")
        var pat = "storageRoot:["
        var j1 = msg.indexOf(pat)
        var i0 = msg.indexOf(pat)
        var i1 = i0 + pat.length
        var i2 = msg.indexOf("]",i1)
        var storageRoot = msg.substring(i1,i2)
        logger.debug("storage root:->" + storageRoot)
        logger.debug("msg->" + msg)

        if(e1 != -1){
            storageRoot = null
            logger.error("ERROR: invalid address")
        } else if(j1 != -1){
            var i0 = msg.indexOf(pat)
            var i1 = i0 + pat.length
            var i2 = msg.indexOf("]",i1)
            var storageRoot = msg.substring(i1,i2)
            storageRootArr[nodeId] = storageRoot
            logger.debug((new Date()) + " amal storage root:->" + storageRoot)
        }

    }).catch(function (err) {
        console.error('ERROR: ', err);
    });
    logger.debug(new Date() + " before r2 -> " + storageRootArr[nodeId])
    return true
}






describe("storage root for private smart contract from node1 to node7", function () {

    it('should have same store root for a contract in node1 and node7 but different in other nodes', async () => {
    var res =  await testStorageRoot()
    assert.equal(res, true, "test failed")
    assert.notEqual(storageRootArr["1"], null, "storage root null in node1")
    assert.notEqual(storageRootArr["3"], null, "storage root null in node3")
    assert.notEqual(storageRootArr["7"], null, "storage root null in node7")
    assert.equal(storageRootArr["1"], storageRootArr["7"], "storage root is not same in node"+fromNodeId+" and node"+toNodeId+" for private smart contract")
    assert.notEqual(storageRootArr["1"], storageRootArr["3"], "storage root is same in node1 and node3 for private smart contract")
})
})

