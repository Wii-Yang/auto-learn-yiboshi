const {readFileSync, writeFileSync} = require('fs')
const nodeCmd = require('node-cmd')

const {getUserList} = require('./user')
const {login} = require('./login')
const {readlineSync} = require('./utils')
const {configFileUrl} = require('./user/utils')
const {chromedriverFileUrl} = require('./browser')

async function initProjectConfigFile() {
  // 结束标识
  let state = false

  // chromedriver.exe 文件
  try {
    readFileSync(chromedriverFileUrl)
    state = true
  } catch (e) {
    console.log('请下载本电脑 chrome 浏览器版本对应的 chromedriver.exe 文件并放置到当前文件夹。')
    console.log('chrome 浏览器版本查看方式请自行百度，推荐的 chromedriver.exe 的下载网址为 https://registry.npmmirror.com/binary.html?path=chromedriver')
    process.stdout.write('是否直接打开网站：(Y/N)')
    const answer = await readlineSync()
    if (answer === 'y' || answer === 'Y') {
      await nodeCmd.run('start https://registry.npmmirror.com/binary.html?path=chromedriver')
    }
    process.stdout.write('输入回车键结束......')
    await readlineSync()
    state = false
  }

  // 配置文件
  try {
    readFileSync(configFileUrl)
  } catch (e) {
    console.log('初始化配置文件')
    writeFileSync(configFileUrl, JSON.stringify([]), 'utf8')
  }

  return state
}

async function startProject() {
  console.log('启动程序')

  // 初始化项目配置文件
  if (!await initProjectConfigFile()) {
    return console.log('程序结束')
  }

  // 获取用户列表
  const userList = await getUserList()

  if (userList.length === 0) {
    return console.log('程序结束')
  }

  userList.forEach(async username => {
    if (await login(username)) {
      // 登录成功
    } else {
      console.log(`${username}：登录失败，跳过学习`)
    }
  })
}

module.exports = startProject
