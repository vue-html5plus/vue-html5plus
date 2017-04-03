/**
 * 获取当前设备位置信息
 * @param option
 * @returns {Promise}
 */

let getCurrentPosition = (option) => {
    return new Promise(function (resolve, reject) {
        plus.geolocation.getCurrentPosition(function (position) {
            resolve(position);
        }, function (error) {
            reject(error);
        }, option || {});
    });
};

/**
 * 监听设备位置变化信息
 * @param option
 * @returns {Promise}
 */
let watchPosition = (option) => {
    return new Promise(function (resolve, reject) {
        plus.geolocation.watchPosition(function (position) {
            resolve(position);
        }, function (error) {
            reject(error);
        }, option || {});
    });
};

/**
 * 关闭监听设备位置信息
 * @param watchId
 */
let clearWatch = (watchId) => {
    plus.geolocation.clearWatch(watchId);
};

export {getCurrentPosition, watchPosition, clearWatch};
