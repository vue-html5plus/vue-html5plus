import os from './os'

/**
 * 获取网络信息
 * @returns {*}
 */
let getCurrentNetworkType = () => {
  let NetworkType = ['UNKNOW', 'NONE', 'ETHERNET', 'WIFI', '2G', '3G', '4G']
  if (os.plus) {
    return NetworkType[window.plus.networkinfo.getCurrentType()]
  }
  return null
}

export default {getCurrentNetworkType}
