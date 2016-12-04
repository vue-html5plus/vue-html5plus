import vhp from './vhp'

function _plusReady (options, globalObj) {
	if(!options) return;

	vhp.plusReady(function(){
		if(typeof options === 'object'){
			// 初始化
			if(options.init){
  			options.init.call(globalObj);
  		}
    	// 定位
    	if(options.getLocation){
  			vhp.getCurrentPosition(options.getLocation, globalObj);
      }
      // 获取网络信息
      if(options.getNetworkType){
  	    var type = vhp.getCurrentNetworkType();
  	    options.getNetworkType.call(globalObj, type);
      }
	  } else if (typeof options === 'function') {
			options.call(globalObj);
	  }
  });
}

export {_plusReady}
