const {readlineSync} = require('../utils')
const {add, getAll} = require('./utils')

// 新增用户
async function addUser() {
  const userList = getAll()
  process.stdout.write('请输入用户名：')
  const username = await readlineSync()
  const index = userList.findIndex(user => user.username === username)
  if (index >=0) {
    console.error('当前用户已存在！')
    return console.log('返回菜单')
  }
  process.stdout.write('请输入密码：')
  const password = await readlineSync()
  const user = {username, password}
  add(user)
}

module.exports.addUser = addUser