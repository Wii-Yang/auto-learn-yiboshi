const path = require('path')
const {Builder} = require('selenium-webdriver')
const {Options, ServiceBuilder} = require('selenium-webdriver/chrome')

const chromedriverFileUrl = path.join(process.cwd(), 'chromedriver.exe')

function getChromeOptions({visible = true}) {
  // 初始化浏览器配置
  const chromeOptions = new Options()

  // 浏览器显示
  if (!visible) {
    chromeOptions.headless()
  }
  const arguments = []

  return chromeOptions
}

async function createBrowser(options) {
  // 获取浏览器配置项
  const chromeOptions = getChromeOptions(options)
  // 获取chromedriver
  const service = new ServiceBuilder(chromedriverFileUrl)
  // 创建浏览器实例
  const driver = new Builder().forBrowser('chrome').setChromeService(service).setChromeOptions(chromeOptions).build()
  // 浏览器窗口最大化
  await driver.manage().window().maximize()

  return driver
}

async function displayIsNone(dom) {
  const style = await dom.getAttribute('style')
  return style.search('display: none')
}

module.exports.chromedriverFileUrl = chromedriverFileUrl
module.exports.createBrowser = createBrowser
module.exports.displayIsNone = displayIsNone