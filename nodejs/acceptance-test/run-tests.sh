#!/bin/bash
#cd ~/quorum-examples/nodejs/acceptance-test/
echo "running acceptance test cases..."
mocha --timeout 35000 config_test.js
mocha --timeout 35000 public_smart_contract_test.js
mocha --timeout 35000 private_smart_contract_test.js
mocha --timeout 35000 private_contract_storage_root_test.js
mocha --timeout 35000 private_txn_test.js
mocha --timeout 35000 public_txn_test.js
##mocha --timeout 40000 public_signed_txn_test.js
echo "running acceptance test done."
