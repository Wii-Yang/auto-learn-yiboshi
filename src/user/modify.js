const {printAll, getByNumber, update} = require('./utils')
const {readlineSync} = require('../utils')

async function modifyUser() {
  printAll()
  process.stdout.write('请选择需要修改密码的用户：')
  const number = await readlineSync()
  const user = getByNumber(number)
  if (!user) {
    console.log('输入错误，返回菜单。')
    return
  }

  process.stdout.write('请输入新的密码：')
  user.password = await readlineSync()

  update(user)
}

module.exports.modifyUser = modifyUser