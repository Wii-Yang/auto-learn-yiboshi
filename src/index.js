const {readFileSync, writeFileSync} = require('fs')
const path = require('path')

const {getUserList} = require('./user')

const configFileUrl = path.join(process.cwd(), 'config.json')

function initProjectConfigFile() {
  try {
    readFileSync(configFileUrl)
  } catch (e) {
    console.log('初始化配置文件')
    writeFileSync(configFileUrl, JSON.stringify([]), 'utf8')
  }
}

async function startProject() {
  console.log('启动项目')

  // 初始化项目配置文件
  initProjectConfigFile()

  // 获取用户列表
  const userList = await getUserList()

  if (userList.length === 0) {
    return console.log('项目运行结束')
  }

  console.log(userList)
}

module.exports = startProject
