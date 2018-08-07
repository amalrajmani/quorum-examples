#!/bin/bash

ca=$2
nid=$1

x=$(geth attach ipc:/home/vagrant/quorum-examples/examples/7nodes/qdata/dd$nid/geth.ipc <<EOF
var b=eth.blockNumber;
var sr=eth.storageRoot(eth.getTransactionReceipt("$ca").contractAddress);
console.log("storageRoot:["+sr+"]");
exit;
EOF
)
echo $x