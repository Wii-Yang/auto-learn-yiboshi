const readline = require('readline')

function readlineSync() {
  return new Promise(resolve => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    rl.on('line', data => {
      rl.close()
      resolve(data)
    })
  })
}

module.exports = readlineSync