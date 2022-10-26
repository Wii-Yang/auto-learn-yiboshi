const {readFileSync, writeFileSync} = require('fs')
const path = require('path')

const configFileUrl = path.join(process.cwd(), 'config.json')

/**
 * 查询系统内的所有用户
 * @return {[]} 返回 user 数组
 */
function getAllUserList() {
  const userListJSON = readFileSync(configFileUrl).toString()
  const userList = JSON.parse(userListJSON)
  return userList.length > 0 ? userList : []
}

/**
 * 添加用户
 * @param user 至少包含 username 和 password 两个字段
 * @return {user} 返回 user 对象
 */
function addUser(user) {
  const userList = getAllUserList()
  userList.push(user)
  writeFileSync(configFileUrl, JSON.stringify(userList), 'utf8')
  console.log(`${user.username}：添加成功`)
  return user
}

/**
 * 通过 username 删除用户
 * @param username 用户名
 * @returns {boolean} 成功返回 true | 失败返回 false
 */
function removeUserByUsername(username) {
  const userList = getAllUserList()
  const index = userList.findIndex(item => item.username === username)
  if (index >= 0) {
    userList.splice(index, 1)
    writeFileSync(configFileUrl, JSON.stringify(userList), 'utf8')
    console.log(`${username}：删除成功`)
    return true
  } else {
    console.log(`${username}：删除失败`)
    return false
  }
}

/**
 * 更新用户信息
 * @param user 至少包含 username 字段
 * @returns {boolean|user} 成功返回 user 对象 | 失败返回 false
 */
function updateUser(user) {
  const userList = getAllUserList()
  const index = userList.findIndex(item => item.username === user.username)
  if (index >= 0) {
    user = Object.assign(userList[index], user)
    userList.splice(index, 1, user)
    writeFileSync(configFileUrl, JSON.stringify(userList), 'utf8')
    console.log(`${user.username}：更新成功`)
    return user
  } else {
    console.log(`${user.username}：更新失败`)
    return false
  }
}

/**
 * 通过 username 查询用户
 * @param username 用户名
 * @returns {boolean|user} 成功返回 user 对象 | 失败返回 false
 */
function getUserByUsername(username) {
  const userList = getAllUserList()
  const user = userList.find(item => item.username === username)
  if (user) {
    console.log(`${username}：查询成功`)
    return user
  } else {
    console.log(`${username}：查询失败`)
    return false
  }
}

/**
 * 通过用户列表序号查询用户信息
 * @param number 序号
 * @return {boolean|user} 成功返回 user 对象 | 失败返回 false
 */
function getUserByNumber(number) {
  const userList = getAllUserList()
  const user = userList.find((item, index) => index === number - 1)
  if (user) {
    console.log(`${user.username}：查询成功`)
    return user
  } else {
    console.log(`查询失败`)
    return false
  }
}

/**
 * 打印当前所有用户
 */
function printUserList() {
  const userList = getAllUserList()

  // 打印当前存储的用户
  console.log('用户列表：')
  userList.forEach((user, index) => {
    if (user.name) {
      console.log(`[${index + 1}] ${user.name} 用户名：${user.username}，密码：${user.password}`)
    } else {
      console.log(`[${index + 1}] ${user.username}(未登录) 用户名：${user.username}，密码：${user.password}`)
    }
  })
}

module.exports.configFileUrl = configFileUrl
module.exports.getAll = getAllUserList
module.exports.add = addUser
module.exports.removeByUsername = removeUserByUsername
module.exports.update = updateUser
module.exports.getByUsername = getUserByUsername
module.exports.getByNumber = getUserByNumber
module.exports.printAll = printUserList
