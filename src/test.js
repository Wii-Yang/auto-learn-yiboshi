const {Options, ServiceBuilder} = require('selenium-webdriver/chrome')
const {Builder} = require('selenium-webdriver')
const {HttpResponse} = require('selenium-webdriver/devtools/networkinterceptor')
const {chromedriverFileUrl} = require('./browser')
const arguments = [
  '--no-sandbox',
  '--ignore-certificate-errors',
  '--ignore-ssl-error',
  '--mute-audio',
  'disable-infobars',
]
// 浏览器配置
const chromeOptions = new Options().addArguments(arguments)
// 获取chromedriver
const service = new ServiceBuilder(chromedriverFileUrl)
// 创建浏览器实例
const driver = new Builder().forBrowser('chrome').setChromeService(service).setChromeOptions(chromeOptions).build()

mian()

async function mian() {
  const connection = await driver.createCDPConnection('page')
// let url = fileServer.whereIs("/cheese")
  let httpResponse = new HttpResponse('https://www.baidu.com')
  httpResponse.addHeaders("Content-Type", "UTF-8")
  httpResponse.body = "sausages"
  await driver.onIntercept(connection, httpResponse, async function () {
    let body = await driver.getPageSource()
    console.log('body')
    assert.strictEqual(body.includes("sausages"), true, `Body contains: ${body}`)
  })
  driver.get('https://www.baidu.com')
}