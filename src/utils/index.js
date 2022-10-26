const readlineSync = require('./readlineSync')
const {enterWhetherItIsNOrY} = require('./verifyInput')

module.exports.readlineSync = readlineSync
module.exports.verifyInput = {
  enterWhetherItIsNOrY
}