import evt from './vhp/event'
import os from './vhp/os'
import nativeUI from './vhp/nativeUI'
import accelerometer from './vhp/accelerometer'
import geolocation from './vhp/geolocation'
import networkinfo from './vhp/networkinfo'
import _ from './utils'

const VueHtml5Plus = {}
VueHtml5Plus.install = (Vue) => {
  Vue.mixin({
    beforeCreate () {
      if (os.plus) {
        let _options = this.$options
        evt.plusReady(function () {
          if (_.isFunction(_options.plusReady)) {
            _options.plusReady.call(this)
          }
          if (_.isFunction(_options.listenNetwork)) {
            evt.listenNetwork(function () {
              _options.listenNetwork.call(this)
            })
          }
        }.bind(this))
      }
    }
  })

  Vue.prototype.plusReady = evt.plusReady
  Vue.prototype.os = os
  Vue.prototype.$nativeUI = nativeUI
  Vue.prototype.$accelerometer = accelerometer
  Vue.prototype.$geolocation = geolocation
  Vue.prototype.$networkinfo = networkinfo
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueHtml5Plus)
}

export default VueHtml5Plus
