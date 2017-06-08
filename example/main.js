import Vue from 'vue'
import VueHtml5Plus from 'vue-html5plus'
import App from './App.vue'

Vue.use(VueHtml5Plus)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
