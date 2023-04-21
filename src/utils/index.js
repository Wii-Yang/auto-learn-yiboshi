const readlineSync = require('./readlineSync')
const {enterWhetherItIsNOrY} = require('./verifyInput')
const YiboshiUrl = 'https://www.yiboshi.com/'

module.exports.readlineSync = readlineSync
module.exports.verifyInput = {
  enterWhetherItIsNOrY
}
module.exports.YiboshiUrl = YiboshiUrl
