# acceptance test

This is used to test different test scenarios using test scripts based on mocha framework. The test scripts are 
nodejs programs with mocha's `describe/context/it` style test cases.
`web3js` is mainly used to invoke `geth` API calls.

Usage:

- `npm-uninstall.sh`: Remove `npm, node` and all packages 
- `test-init.sh`: Install `node, npm, mocha, tracer, child-process-promise, ethereumjs-tx, keythereum` that are need for testing. And set `NODE_PATH`
- `run-tests.sh`: To run all test cases
- `mocha --timeout 40000 <test-file>`: To run a specific test case. 

##Example test run:


Run a specific test case
```
mocha --timeout 35000 public_smart_contract_test.js
  public contract with emitEvent
    sending from node1
      ✓ should have same number of events/logs visible in all nodes (1326ms)
    sending from node2
      ✓ should have same number of events/logs visible in all nodes (2238ms)
    sending from node3
      ✓ should have same number of events/logs visible in all nodes (1264ms)
    sending from node4
      ✓ should have same number of events/logs visible in all nodes (1269ms)
    sending from node5
      ✓ should have same number of events/logs visible in all nodes (2251ms)
    sending from node6
      ✓ should have same number of events/logs visible in all nodes (1251ms)


  6 passing (10s)

```
To run all test cases:
```
./run-tests.sh
running acceptance test cases...


  config
    accounts
      ✓ should have accounts defined
    nodes
      ✓ should have nodes defined
    constellation
      ✓ should have keys defined


  3 passing (6ms)



  public contract with emitEvent
    sending from node1
      ✓ should have same number of events/logs visible in all nodes (1345ms)
    sending from node2
      ✓ should have same number of events/logs visible in all nodes (1277ms)
    sending from node3
      ✓ should have same number of events/logs visible in all nodes (1272ms)
    sending from node4
      ✓ should have same number of events/logs visible in all nodes (256ms)
    sending from node5
      ✓ should have same number of events/logs visible in all nodes (1299ms)
    sending from node6
      ✓ should have same number of events/logs visible in all nodes (1234ms)


  6 passing (7s)



  private contract with emitEvent
    sending from node1
      ✓ should have same number of events/logs visible in nodes participating in private txn (311ms)
    sending from node2
      ✓ should have same number of events/logs visible in nodes participating in private txn (251ms)
    sending from node3
      ✓ should have same number of events/logs visible in nodes participating in private txn (278ms)
    sending from node4
      ✓ should have same number of events/logs visible in nodes participating in private txn (1250ms)
    sending from node5
      ✓ should have same number of events/logs visible in nodes participating in private txn (1250ms)
    sending from node6
      ✓ should have same number of events/logs visible in nodes participating in private txn (203ms)


  6 passing (4s)



  storage root for private smart contract from node1 to node7
    ✓ should have same store root for a contract in node1 and node7 but different in other nodes (3613ms)


  1 passing (4s)



  PrivateSendTransaction in parallel
    ✓ should run in parallel across node1 to node7 (7688ms)

  PrivateSendTransaction with ether value
    ✓ should fail

  PrivateSendTransaction in sequence
    sendTransaction
      ✓ should work from node1 (2743ms)
    sendTransaction
      ✓ should work from node2 (4721ms)
    sendTransaction
      ✓ should work from node3 (3722ms)
    sendTransaction
      ✓ should work from node4 (3738ms)
    sendTransaction
      ✓ should work from node5 (4725ms)
    sendTransaction
      ✓ should work from node6 (3724ms)
    sendTransaction
      ✓ should work from node7 (3821ms)


  9 passing (35s)



  PublicSendTransaction in parallel
    ✓ should run in parallel across node1 to node7 (8512ms)

  PublicSendTransaction in sequence
    sendTransaction
      ✓ should work from node1 (1757ms)
    sendTransaction
      ✓ should work from node2 (4711ms)
    sendTransaction
      ✓ should work from node3 (2720ms)
    sendTransaction
      ✓ should work from node4 (4726ms)
    sendTransaction
      ✓ should work from node5 (1720ms)
    sendTransaction
      ✓ should work from node6 (1723ms)
    sendTransaction
      ✓ should work from node7 (3720ms)


  8 passing (30s)



  signed transaction
    send signed transaction from node1 to other nodes
      1) should send signed transaction to other nodes
    send signed transaction from node2 to other nodes
      2) should send signed transaction to other nodes
    send signed transaction from node3 to other nodes
      3) should send signed transaction to other nodes
    send signed transaction from node4 to other nodes
      4) should send signed transaction to other nodes
    send signed transaction from node5 to other nodes
      5) should send signed transaction to other nodes
    send signed transaction from node6 to other nodes
      6) should send signed transaction to other nodes
    send signed transaction from node7 to other nodes
      7) should send signed transaction to other nodes


  0 passing (3m)
  7 failing

  1) signed transaction
       send signed transaction from node1 to other nodes
         should send signed transaction to other nodes:
     Error: Timeout of 35000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/vagrant/nodejs/acceptance-test/signed_txn_test.js)


  2) signed transaction
       send signed transaction from node2 to other nodes
         should send signed transaction to other nodes:
     Error: Timeout of 35000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/vagrant/nodejs/acceptance-test/signed_txn_test.js)


  3) signed transaction
       send signed transaction from node3 to other nodes
         should send signed transaction to other nodes:
     Error: Timeout of 35000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/vagrant/nodejs/acceptance-test/signed_txn_test.js)


  4) signed transaction
       send signed transaction from node4 to other nodes
         should send signed transaction to other nodes:
     Error: Timeout of 35000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/vagrant/nodejs/acceptance-test/signed_txn_test.js)


  5) signed transaction
       send signed transaction from node5 to other nodes
         should send signed transaction to other nodes:
     Error: Timeout of 35000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/vagrant/nodejs/acceptance-test/signed_txn_test.js)


  6) signed transaction
       send signed transaction from node6 to other nodes
         should send signed transaction to other nodes:
     Error: Returned error: insufficient funds for gas * price + value
      at Object.ErrorResponse (/home/vagrant/node_modules/web3-core-helpers/src/errors.js:29:16)
      at /home/vagrant/node_modules/web3-core-requestmanager/src/index.js:140:36
      at XMLHttpRequest.request.onreadystatechange (/home/vagrant/node_modules/web3-providers-http/src/index.js:79:13)
      at XMLHttpRequestEventTarget.dispatchEvent (/home/vagrant/node_modules/xhr2-cookies/dist/xml-http-request-event-target.js:34:22)
      at XMLHttpRequest._setReadyState (/home/vagrant/node_modules/xhr2-cookies/dist/xml-http-request.js:208:14)
      at XMLHttpRequest._onHttpResponseEnd (/home/vagrant/node_modules/xhr2-cookies/dist/xml-http-request.js:318:14)
      at IncomingMessage.<anonymous> (/home/vagrant/node_modules/xhr2-cookies/dist/xml-http-request.js:289:61)
      at endReadableNT (_stream_readable.js:1081:12)
      at process._tickCallback (internal/process/next_tick.js:63:19)

  7) signed transaction
       send signed transaction from node7 to other nodes
         should send signed transaction to other nodes:
     Error: Returned error: nonce too low
      at Object.ErrorResponse (/home/vagrant/node_modules/web3-core-helpers/src/errors.js:29:16)
      at /home/vagrant/node_modules/web3-core-requestmanager/src/index.js:140:36
      at XMLHttpRequest.request.onreadystatechange (/home/vagrant/node_modules/web3-providers-http/src/index.js:79:13)
      at XMLHttpRequestEventTarget.dispatchEvent (/home/vagrant/node_modules/xhr2-cookies/dist/xml-http-request-event-target.js:34:22)
      at XMLHttpRequest._setReadyState (/home/vagrant/node_modules/xhr2-cookies/dist/xml-http-request.js:208:14)
      at XMLHttpRequest._onHttpResponseEnd (/home/vagrant/node_modules/xhr2-cookies/dist/xml-http-request.js:318:14)
      at IncomingMessage.<anonymous> (/home/vagrant/node_modules/xhr2-cookies/dist/xml-http-request.js:289:61)
      at endReadableNT (_stream_readable.js:1081:12)
      at process._tickCallback (internal/process/next_tick.js:63:19)
```      

