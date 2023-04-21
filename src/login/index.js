const {By, until} = require('selenium-webdriver')

const {getByUsername, update} = require('../user/utils')
const {createBrowser, displayIsNone} = require('../browser')

async function manualVerification(browser, username, password) {
  // 获取登录框
  const newLoginBox = await browser.wait(until.elementLocated(By.className('new_login_box')))
  // 获取输入用户名密码的登录框
  const nlbMain = (await newLoginBox.findElements(By.className('nlb_main'))).find(async item => {
    return !(await displayIsNone(item))
  })
  // 获取输入框
  const nlbInput = await nlbMain.findElements(By.className('nlb_input'))
  // 输入用户名
  await (nlbInput[0].findElement(By.tagName('input'))).sendKeys(username)
  // 输入密码
  await (nlbInput[1].findElement(By.tagName('input'))).sendKeys(password)

  // 获取登录按钮
  const nlbBtn = (await nlbMain.findElements(By.className('nlb_btn')))[0]
  // 点击登录
  await nlbBtn.click()

  // 等待滑动拼图验证出现
  await browser.wait(until.elementLocated(By.className('verifyMain')))

  // 等待手动完成验证
  console.log('等待手动完成验证')
  await browser.wait(async () => {
    const verifyMain = await browser.findElements(By.className('verifyMain'))
    return verifyMain.length === 0
  })

  // 完成登录
  await nlbBtn.click()

  let name = ''
  try {
    // 获取姓名
    const nameInput = await browser.wait(until.elementLocated(By.id('name')), 1000 * 10)
    name = await nameInput.getAttribute('value')
    // 获取 authorization
    const token = await browser.executeScript('return localStorage.getItem("www_5HGGWrXN_token");')

    // 将 name 和 authorization 更新到 config.json 文件中
    update({ username, name, token })
  } catch (e) {
    await manualVerification(browser, username, password)
  }
}

async function login(username) {

  const user = getByUsername(username)

  let status = false
  try {
    // 创建浏览器
    const browser = await createBrowser()
    // 打开医博士
    await browser.get('https://www.yiboshi.com/')
    if (!user.token) {
      // 手动验证
      await manualVerification(browser, user.username, user.password)
    } else {
      // 写入 token
      await browser.executeScript(`localStorage.setItem('www_5HGGWrXN_token', '${user.token}');`)
      // 刷新当前页
      await browser.navigate().refresh()
    }

    // 获取到 token 后关闭当前浏览器
    await browser.close()
    status = true
  } catch (e) {
    status = false
  }

  return status
}

module.exports.login = login