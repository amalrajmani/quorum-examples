module.exports = {


    sleep: function (milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    },

    getRandomInt: function (max) {
        var x = Math.floor(Math.random() * Math.floor(max))
        while (x == 0) {
            x = Math.floor(Math.random() * Math.floor(max))
        }
        return x
    }


}