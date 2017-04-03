/**
 * 获取当前设备的加速度信息
 * @returns {Promise}
 */
let getCurrentAcceleration = () => {
    return new Promise(function (resolve, reject) {
        plus.accelerometer.getCurrentAcceleration(function (acceleration) {
            resolve(acceleration);
        }, function (error) {
            reject(error);
        });
    });
};

/**
 * 监听设备加速度变化信息
 * @param option
 * @returns {Promise}
 */
let watchAcceleration = (option) => {
    return new Promise(function (resolve, reject) {
        plus.accelerometer.watchAcceleration(function (acceleration) {
            resolve(acceleration);
        }, function (error) {
            reject(error);
        }, option || {});
    });
};

/**
 * 关闭监听设备加速度信息
 * @param watchId
 */
let clearWatch = (watchId) => {
    plus.accelerometer.clearWatch(watchId);
};

export {getCurrentAcceleration, watchAcceleration, clearWatch};
