var sodium = require('sodium-native')

// Allocate Buffer for output hash
var output = Buffer.alloc(sodium.crypto_generichash_BYTES)

// Convert input to string and then Buffer
var input = Buffer.from("Hello, World!")

// Compute blake2b hash
sodium.crypto_generichash(output, input)

// Convert bytes to printable string
console.log(output.toString('hex'))