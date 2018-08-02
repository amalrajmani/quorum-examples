var cfg = require("./config")
var assert = require('assert')

describe("config", function () {

    describe("accounts", function (){
        it('should have accounts defined', function () {
            assert.equal(8, cfg.accounts().length)
        })
    })

    describe("nodes", function (){
        it('should have nodes defined', function () {
            var p = 22000
            assert.equal(8, cfg.nodes().length)
            for(var k = 1; k <=7; ++k){
                assert.equal(cfg.nodes()[k],'http://localhost:'+p)
                p++
            }
        })
    })

})