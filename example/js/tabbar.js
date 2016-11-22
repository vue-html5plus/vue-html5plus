(function(VuePlus, $){
	
	var aniShow = {};
	
	var _style = {}, _subpages = [];
	
	/**
	 * 初始化
	 * @param {Object} config
	 */
	$.init = function (config) {
		var _activeIndex = config.activeIndex;
		_style = config.style;
		_subpages = config.subpages;
		
		if(VuePlus.os.plus){
			VuePlus.plusReadyFn(function(){	
				var self = plus.webview.currentWebview();
				for (var i = 0; i < 3; i++) {
					var temp = {}, subpage = _subpages[i];
					// 避免重复创建
					var subWebview = plus.webview.getWebviewById(subpage);
					if(subWebview){
						return;
					}
					var sub = plus.webview.create(subpage, subpage, _style);
					if (i !== _activeIndex) {
						sub.hide();
					}else{
						temp[subpage] = "true";
						VuePlus.extend(aniShow,temp);
					}
					self.append(sub);
				}
			})
		} else {
			// 创建iframe代替子页面
	        $.createIframe('.mui-content',{
	            url: _subpages[_activeIndex],
	            style: _style
	        });
		}
	}

	/**
	 * 创建子页面
	 * @param {Object} el
	 * @param {Object} opt
	 */
	$.createIframe = function (el, opt) {
	    var elContainer = document.querySelector(el);
	    var wrapper = document.querySelector(".mui-iframe-wrapper");
	    if(!wrapper){
	        // 创建wrapper 和 iframe
	        wrapper = document.createElement('div');
	        wrapper.className = 'mui-iframe-wrapper';
	        for(var i in opt.style){
	            wrapper.style[i] = opt.style[i];
	        }
	        var iframe = document.createElement('iframe');
	        iframe.src = opt.url;
	        iframe.id = opt.id || opt.url;
	        iframe.name = opt.id;
	        wrapper.appendChild(iframe);
	        elContainer.appendChild(wrapper);
	    }else{
	        var iframe = wrapper.querySelector('iframe');
	        iframe.src = opt.url;
	        iframe.id = opt.id || opt.url;
	        iframe.name = iframe.id;
	    }
	}
	
	/**
	 * 切换视图
	 * @param {Object} index
	 */
	$.switchView = function (index, callback) {
		var activeIndex = VuePlus.vm.activeIndex
		if (index == activeIndex) {
			return;
		}
		var targetTab = _subpages[index];
		var activeTab = _subpages[activeIndex];
				
		// 子页内容切换
	    if(VuePlus.os.plus){
	        // 若为iOS平台或非首次显示，则直接显示
			if(VuePlus.os.ios||aniShow[targetTab]){
				plus.webview.show(targetTab);
			}else{
				// 否则，使用fade-in动画，且保存变量
				var temp = {};
				temp[targetTab] = "true";
				VuePlus.extend(aniShow,temp);
				plus.webview.show(targetTab,"fade-in",300);
			}
			// 隐藏当前;
			plus.webview.hide(activeTab);	
	   }else{
	        // 创建iframe代替子页面
	        $.createIframe('.mui-content',{
	            url: targetTab,
	            style: _style
	        });
	    }
	    
	    // 添加回调方法
	    typeof callback === 'function' && callback();
	    
	    // 更改当前活跃的选项卡序号
		VuePlus.vm.activeIndex = index;
	}
})(VuePlus, window.tabbar = {});
