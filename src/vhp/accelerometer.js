/**
 * 获取当前设备的加速度信息
 * @returns {Promise}
 */
let getCurrentAcceleration = () => {
  return new Promise(function (resolve, reject) {
    window.plus.accelerometer.getCurrentAcceleration((acceleration) => {
      resolve(acceleration)
    }, (error) => {
      reject(error)
    })
  })
}

/**
 * 监听设备加速度变化信息
 * @param option
 * @returns {Promise}
 */
let watchAcceleration = (option) => {
  return new Promise(function (resolve, reject) {
    window.plus.accelerometer.watchAcceleration((acceleration) => {
      resolve(acceleration)
    }, (error) => {
      reject(error)
    }, option || {})
  })
}

/**
 * 关闭监听设备加速度信息
 * @param watchId
 */
let clearWatch = (watchId) => {
  window.plus.accelerometer.clearWatch(watchId)
}

export default {getCurrentAcceleration, watchAcceleration, clearWatch}
