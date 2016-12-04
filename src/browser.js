import vhp from './vhp'

// 内置浏览器
function _browser (options) {

	if(typeof options !== 'object'){
		throw 'this is not a Object!'
	}

	var setting = {
		bounce: true,
		style: { // 浏览器样式
			top: '44px',
      bottom: '0px'
		}
	}

	vhp.plusReady(function(){
		// 地址
		var _url;
		if(typeof options.url === 'string'){
			_url = options.url
		} else if (typeof options.url === 'function') {
			_url = options.url();
		}

		// 设置样式
		var _style = setting.style;
		if(options.style){
			_style = options.style;
		}

		// 创建webview
		var _browserWv = plus.webview.create(_url, '_vhp_browser', _style);
		_browserWv.browser = true;
		vhp.currentWebview().append(_browserWv);

		// 设置回弹
		if(options.bounce === true || (options.bounce === undefined && setting.bounce)){
			_browserWv.setBounce({position:{top:"150px"},changeoffset:{top:"0px"}});
		}

		// 设置标题
		if(options.title){
			_browserWv.addEventListener('titleUpdate', function(e){
				if(typeof options.title === 'function'){
					options.title(e.title);
				} else if (typeof options.title === 'string') {
					vhp(options.title).html(e.title);
				}
			}, false);
		}

		// 加载中
		if(options.loading){
			_browserWv.addEventListener('loading', function(){
				options.loading();
			});
		}

		// 加载完成
		if(options.loaded){
			_browserWv.addEventListener('loaded', function(){
				options.loaded();
			});
		}

    // 监听关闭
    if(options.close){
			vhp.currentWebview().addEventListener('close', function(){
				options.close();
			});
		}

		// 监听返回事件
		if(options.back){
			vhp.back(options.back);
		}
	})
}

export {_browser}
