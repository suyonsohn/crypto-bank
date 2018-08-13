var jsonStream = require('duplex-json-stream')
var net = require('net')

var log = []
var commands = {
    'deposit': function (sum, amount) {
        return sum + amount
    },
    'withdraw': function (sum, amount) {
        return sum - amount
    },
    'balance': function (sum, amount) {
        return sum + amount
    }
}

var server = net.createServer(function (socket) {
    socket = jsonStream(socket)

    socket.on('data', function (msg) {
        console.log('Bank received:', msg)

        var options = Object.keys(commands)
        // console.log('OPTIONS: ' + options)
        if (options.indexOf(msg.command) === -1) return
        // console.log('INDEXOF: ' + options.indexOf(msg.command))
        log.push(msg)
        // console.log(log)
        var balance = log.reduce(function (sum, msg) {
            return commands[msg.command](sum, msg.amount)
        }, 0)
        if (balance < 0) {
            log.pop()
            socket.write('Invalid request: not enough funds.')
            return
        }
        socket.write({
            balance: balance
        })
    })
})

server.listen(3876)