/**
 * Created by Administrator on 2017/4/26.
 */

export default {
  toast (message, duration, align) {
    let options = {}
    options.duration = duration || 'short'
    options.verticalAlign = align || 'bottom'
    return window.plus.nativeUI.toast(message, options)
  },
  alert (message, alertCB, title, buttonCapture) {
    return window.plus.nativeUI.alert(message, alertCB, title, buttonCapture)
  },
  confirm (message, confirmCB, title, buttons) {
    return window.plus.nativeUI.confirm(message, confirmCB, title, buttons)
  },
  prompt (message, promptCB, title, tip, buttons) {
    return window.plus.nativeUI.prompt(message, promptCB, title, tip, buttons)
  },
  actionSheet (actionsheetStyle, actionsheetCallback) {
    return window.plus.nativeUI.actionSheet(actionsheetStyle, actionsheetCallback)
  }
}
