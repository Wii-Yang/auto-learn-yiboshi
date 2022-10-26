const {getByNumber, printAll, getAll} = require('./utils')
const {readlineSync} = require('../utils')

async function selectUser() {
  printAll()
  process.stdout.write('请选择需要学习的用户（多个账号以“,”分割，输入“0”选择全部）:')
  const inputNumber = await readlineSync()

  // 选中的用户列表
  let selectUsers = []

  if (inputNumber === '0') {
    selectUsers = getAll()
  } else {
    try {
      const selectNumberList = inputNumber.split(',')
      selectNumberList.forEach(number => {
        selectUsers.push(getByNumber(number))
      })
    } catch (e) {
      console.log('输入错误，结束项目。')
      return
    }
  }

  return selectUsers.map(user => user.username)
}

module.exports.selectUser = selectUser
