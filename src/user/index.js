const {readlineSync} = require('../utils')
const {printAll, getAll} = require('./utils')
const {addUser} = require('./add')
const {removeUser} = require('./remove')
const {modifyUser} = require('./modify')
const {selectUser} = require('./select')

// 获取用户列表
async function getUserList() {
  // 从 user.json 中读取已存储用户列表
  let type
  do {
    const userList = getAll()
    const nameList = userList.map(user => {
      if (user.name) {0
        return user.name
      } else {
        return `${user.username}(未登录)`
      }
    }).join('，')
    if (userList.length === 0) {
      console.log('当前没有用户')
    } else {
      console.log(`当前用户有${userList.length}个：${nameList}`)
    }
    console.log('功能菜单：')
    console.log('[1] 查看用户详细信息')
    console.log('[2] 添加用户')
    console.log('[3] 删除用户')
    console.log('[4] 修改密码')
    console.log('[0] 开始学习')
    process.stdout.write('请选择菜单：')
    type = await readlineSync()
    switch (type) {
      case '0':
        console.log('开始学习')
        break
      case '1':
        printAll()
        break
      case '2':
        console.log('添加用户')
        await addUser()
        break
      case '3':
        console.log('删除用户')
        await removeUser()
        break
      case '4':
        console.log('修改密码')
        await modifyUser()
        break
      default:
        console.log('输入错误，请重新选择')
        break
    }
  } while (type !== '0')
  // 选择需要学习的用户
  return await selectUser()
}

module.exports.getUserList = getUserList
