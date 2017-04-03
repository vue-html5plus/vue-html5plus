/**
 * 获取网络信息
 * @returns {*}
 */
let getCurrentNetworkType = () => {
    let NetworkType = {};

    NetworkType[plus.networkinfo.CONNECTION_UNKNOW] = 'UNKNOW';
    NetworkType[plus.networkinfo.CONNECTION_NONE] = 'NONE';
    NetworkType[plus.networkinfo.CONNECTION_ETHERNET] = 'ETHERNET';
    NetworkType[plus.networkinfo.CONNECTION_WIFI] = 'WIFI';
    NetworkType[plus.networkinfo.CONNECTION_CELL2G] = '2G';
    NetworkType[plus.networkinfo.CONNECTION_CELL3G] = '3G';
    NetworkType[plus.networkinfo.CONNECTION_CELL4G] = '4G';

    return NetworkType[plus.networkinfo.getCurrentType()];
};

/**
 * 设备网络状态变化事件
 * @param netchangeCallback
 * @param context
 */
let listenNetwork = (netchangeCallback, context) => {
    document.addEventListener("netchange", function () {
        return netchangeCallback.call(context, getCurrentNetworkType());
    }, false);
};

export {getCurrentNetworkType, listenNetwork};
