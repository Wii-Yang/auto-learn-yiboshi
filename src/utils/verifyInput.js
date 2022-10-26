const readlineSync = require('./readlineSync')

async function enterWhetherItIsNOrY() {
  let answer = await readlineSync()
  let end = false
  let result = false
  do {
    if (answer === 'Y' || answer === 'y') {
      end = true
      result = true
    } else if (answer === 'N' || answer === 'n') {
      end = true
      result = false
    } else {
      // 输入非法，重新驶入
      console.log('输入错误，请重新输入.......')
      answer = await readlineSync()
      end = false
    }
  } while (!end)
  return result
}

module.exports.enterWhetherItIsNOrY = enterWhetherItIsNOrY
