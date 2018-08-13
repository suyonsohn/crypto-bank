var jsonStream = require('duplex-json-stream')
var net = require('net')

// Build CLI - node teller.js deposit 123
var cli = process.argv
var command = cli[2]
var amount = cli[3]

var client = jsonStream(net.connect(3876))

client.once('data', function (msg) {
    console.log('Teller received:', msg)
})

var commands = ['deposit', 'withdraw', 'balance']
if (commands.indexOf(command) === -1) {
    console.error('Your command needs to be one of the followings.', JSON.stringify(commands))
    client.end(null)
}
var msg = tellerRequest(command, parseFloat(amount, 10))
client.end(msg)

function tellerRequest(command, amount) {
    var msg = {}
    msg.command = command
    msg.amount = amount || 0
    console.log('Teller sent: ', msg)
    return msg
}