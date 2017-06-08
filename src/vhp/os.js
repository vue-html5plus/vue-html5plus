const os = {
  plus: false,
  stream: false,
  wechat: false,
  android: false,
  iphone: false,
  ipad: false,
  version: ''
}

let ua = navigator.userAgent
// plus
let plus = ua.match(/Html5Plus/i)
// stream
let stream = ua.match(/StreamApp/i)
// wechat
let wechat = ua.match(/(MicroMessenger)\/([\d.]+)/i)
// android
let android = ua.match(/(Android);?[\s/]+([\d.]+)?/)
// iphone
let iphone = ua.match(/(iPhone\sOS)\s([\d_]+)/)
// ipad
let ipad = ua.match(/(iPad).*OS\s([\d_]+)/)

if (plus) {
  os.plus = true
}

if (stream) {
  os.stream = true
}

if (wechat) {
  os.wechat = true
}

if (android) {
  os.android = true
  os.version = android[2]
  os.isBadAndroid = !(/Chrome\/\d/.test(window.navigator.appVersion))
}

if (iphone) {
  os.ios = os.iphone = true
  os.version = iphone[2].replace(/_/g, '.')
}

if (ipad) {
  os.ios = os.ipad = true
  os.version = ipad[2].replace(/_/g, '.')
}

export default os
