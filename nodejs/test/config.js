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
            "0xed9d02e382b34818e88b88a309c7fe71e65f419d","0xca843569e3427144cead5e4d5999a3d0ccf92b8e",
            "0x0fbdc686b912d7722dc86510934589e0aaf3b55a","0x9186eb3d20cbd1f5f992a950d808c4495153abd5",
            "0x0638e1574728b6d862dd5d3a3e0942c3be47d996","0xcc71c7546429a13796cf1bf9228bff213e7ae9cc",
            "0xa9e871f88cbeb870d32d88e4221dcfbd36dd635a"];
    },

    sleep: function(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
                break;
            }
        }
    }
}