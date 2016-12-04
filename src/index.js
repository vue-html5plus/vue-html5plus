import * as utils from './utils';
import {_domReady} from './domReady'
import {_plusReady} from './plusReady'
import {_browser} from './browser'
import vhp from './vhp'

class VueHTML5plus {
	constructor (options) {
		if(typeof options === "object"){
			// Vue实例
			if(window.Vue && options.el){
				this.vm = new Vue({
					mixins: [options]
				});
				if(options.domReady){
					_domReady.call(this, options.domReady, this.vm)
				}
				if(options.plusReady){
					_plusReady.call(this, options.plusReady, this.vm);
				}
			} else {
				if(options.domReady){
					_domReady.call(this, options.domReady, this);
				}
				if(options.plusReady){
					_plusReady.call(this, options.plusReady, this);
				}
			}
			// 内置浏览器
			if(options.browser){
			  _browser.call(this, options.browser);
			}
			// 回退逻辑
			if(options.back){
				vhp.back.call(this, options.back);
			}else{
				vhp.back();
			}

			return this;
		}
	}
}

function  App (options) {
	return new VueHTML5plus(options);
}

if (typeof window !== 'undefined') {
  window.App = App;
}

export default App
