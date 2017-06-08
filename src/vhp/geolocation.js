/**
 * 获取当前设备位置信息
 * @param option
 * @returns {Promise}
 */
let getCurrentPosition = (option) => {
  return new Promise((resolve, reject) => {
    window.plus.geolocation.getCurrentPosition((position) => {
      resolve(position)
    }, (error) => {
      reject(error)
    }, option || {})
  })
}

/**
 * 监听设备位置变化信息
 * @param option
 * @returns {Promise}
 */
let watchPosition = (option) => {
  return new Promise((resolve, reject) => {
    window.plus.geolocation.watchPosition((position) => {
      resolve(position)
    }, (error) => {
      reject(error)
    }, option || {})
  })
}

/**
 * 关闭监听设备位置信息
 * @param watchId
 */
let clearWatch = (watchId) => {
  window.plus.geolocation.clearWatch(watchId)
}

export default {getCurrentPosition, watchPosition, clearWatch}
