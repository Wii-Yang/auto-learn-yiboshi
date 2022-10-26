const {verifyInput, readlineSync} = require('../utils')
const {printAll, configFileUrl, removeByUsername, getAll} = require('./utils')

// 删除用户
async function removeUser() {
  printAll(configFileUrl)
  process.stdout.write('请选择需要删除的用户（多个账号以“,”分割）:')
  let removeIndexList = []
  try {
    removeIndexList = (await readlineSync()).split(',').map(number => Number(number) - 1)
  } catch (e) {
    console.log('输入错误，返回菜单。')
    return
  }

  const userList = getAll()

  // 删除的用户列表
  const removeUserList = userList.filter((user, index) => {
    return removeIndexList.find(item => item === index) >= 0
  })

  removeUserList.forEach(user => {
    removeByUsername(user.username)
  })
}

// 是否删除用户
async function isRemoveUser() {
  process.stdout.write(`是否删除用户？（Y/N）`)
  return await verifyInput.enterWhetherItIsNOrY()
}

module.exports.isRemoveUser = isRemoveUser
module.exports.removeUser = removeUser