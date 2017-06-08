/**
 * plusReady 事件
 * @param callack
 */
export function plusReady (callack) {
  if (window.plus) {
    callack()
  } else {
    document.addEventListener('plusready', callack, false)
  }
}

/**
 * 设备网络状态变化事件
 * @param netchangeCallback
 * @param context
 */
export function listenNetwork (netchangeCallback) {
  document.addEventListener('netchange', netchangeCallback, false)
}

export default {plusReady, listenNetwork}
