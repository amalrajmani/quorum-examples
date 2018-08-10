#!/bin/bash
echo "installing npm packages required for testing..."
curl -sL http://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs

cd /home/vagrant
sudo npm install --global mocha
sudo npm install --global tracer
sudo npm install --global chai
sudo npm install --global child-process-promise
npm install web3
npm install keythereum
npm install ethereumjs-tx

echo "installation complete"
export NODE_PATH=/home/vagrant/node_modules:/usr/lib/node_modules
cd /home/vagrant/quorum-examples/nodejs/acceptance-test