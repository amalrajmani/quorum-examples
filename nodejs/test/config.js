module.exports = {
    //list of nodes defined in 7nodes examples
    nodes: function () {

        return [
            'ignore',
            'http://localhost:22000',
            'http://localhost:22001',
            'http://localhost:22002',
            'http://localhost:22003',
            'http://localhost:22004',
            'http://localhost:22005',
            'http://localhost:22006'
        ];
    },

    //list of accounts defined in 7nodes examples
    //in some nodes there are 2 accounts but taken only one of them to keep it simple
    accounts: function () {
      return ["ignore",
              "0xed9d02e382b34818e88b88a309c7fe71e65f419d",
              "0xca843569e3427144cead5e4d5999a3d0ccf92b8e",
              "0x0fbdc686b912d7722dc86510934589e0aaf3b55a",
              "0x9186eb3d20cbd1f5f992a950d808c4495153abd5",
              "0x0638e1574728b6d862dd5d3a3e0942c3be47d996",
              "0xae9bc6cd5145e67fbd1887a5145271fd182f0ee7",
              "0xcc71c7546429a13796cf1bf9228bff213e7ae9cc"];
    },

    //constellation node ids that can be used for private txn/smart contract
    constellations: function () {
        return ["ignore",
            "BULeR8JyUWhiuuCMU/HLA0Q5pzkYT+cHII3ZKBey3Bo=","QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc=",
            "1iTZde/ndBHvzhcl7V68x44Vx7pl8nwx9LqnM/AfJUg=","oNspPPgszVUFw0qmGFfWwh1uxVUXgvBxleXORHj07g8=",
            "R56gy4dn24YOjwyesTczYa8m5xhP6hF2uTMCju/1xkY=","UfNSeSGySeKg11DVNEnqrUtxYRVor4+CvluI8tVv62Y=",
            "ROAZBWtSacxXQrOe3FGAqJDyJjFePR5ce4TSIzmJ0Bc="];
    },

    basePath: function() { return "/home/vagrant/quorum-examples/examples/7nodes/keys/" },

    qdataPath: function() { return "/home/vagrant/quorum-examples/examples/7nodes/qdata/" },

    //info, debug, warn, error
    logLevel: function () { return 'warn' },

    //processing time to create new blocks
    processingTime: function () {
      return 100
    }

}
