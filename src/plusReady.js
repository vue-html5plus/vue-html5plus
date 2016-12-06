import vhp from './vhp'

function _plusReady(options, globalObj) {
	if (!options) return;

	vhp.plusReady(function () {
		if (typeof options === 'object') {
			// 初始化
			if (options.init) {
				options.init.call(globalObj);
			}
			// 定位
			if (options.getLocation) {
				vhp.getCurrentPosition(options.getLocation, globalObj);
			}
			// 获取网络信息
			if (options.getNetworkType) {
				var type = vhp.getCurrentNetworkType();
				options.getNetworkType.call(globalObj, type);
			}
			//监听网络变化
			if (options.listenNetWork) {
				vhp.listenNetWork(options.listenNetWork, globalObj);
			}
			//获取第三方平台登录信息
			if(options.getOAuth){
				vhp.getOAuth(options.getOAuth, globalObj);
			}
		} else if (typeof options === 'function') {
			options.call(globalObj);
		}

	});
}

export { _plusReady }
