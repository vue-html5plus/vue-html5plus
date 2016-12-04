import {os} from './os'
import {plusReady} from './event';
import {convertUrl, parseParams} from './url';

class nativeView {
	constructor (url, id, options) {
		var styles = options.styles || { top:'0px',left:'0px',height:'100%',width:'100%'};
		var webview = plus.webview.getWebviewById(id);
		if (webview) {
			return webview;
		}
		this.webview = plus.webview.create(url, id, styles, options.extras);
		this.view = new plus.nativeObj.View('_VHP_VIEW');
    this.bitmap = new plus.nativeObj.Bitmap("_VHP_DRAWBITMAP");

    return this.webview
	}

	show (aniShow, duration, callback, animateCallback) {
		var aniShow = aniShow || 'pop-in';
 		var duration = duration || 200;

	 	var drawWebview = this.webview;
	 	var view = this.view;
	 	var bitmap = this.bitmap;

		// 将webview内容绘制到Bitmap对象中
		drawWebview.draw(bitmap,function(){
			console.log('截屏绘制图片成功');
			view.drawBitmap(bitmap);
			view.show();
			console.log(JSON.stringify(view));
			plus.nativeObj.View.startAnimation({
				type: aniShow,
				duration: duration
			}, view, {bitmap: bitmap},function(){
				console.log('动画结束');
				// 关闭原生动画
				drawWebview.show('pop-in', 0, function(){
					console.log('show');
					plus.nativeObj.View.clearAnimation();
					view.clear();
				});
			});
		},function(e){
			console.log('截屏绘制图片失败：'+JSON.stringify(e));
		});
	}
}


/**
 * 获取当前webview对象
 */
var currentWebview = function () {
	return plus.webview.currentWebview();
}

/**
* 查询Webview窗口是否可后退
*/

var first = null;
var handleBack = function () {
	var wobj = currentWebview();
	var parent = wobj.parent();
	var children = wobj.children();
	if (parent) {
		parent.evalJS('vhp&&vhp.back();');
	} else {
		if (wobj.id === plus.runtime.appid) {
			// 弹出提示信息对话框
			if (!first) {
        first = (new Date()).getTime();
        plus.nativeUI.toast('再按一次退出应用');
				setTimeout(function() {
          first = null;
        }, 1000);
      } else {
        if ((new Date()).getTime() - first < 1000) {
          plus.runtime.quit();
        }
      }
		} else if (children) {
			for (var i in children) {
				if(children[i].browser === true){
					children[i].canBack(function(e){
						if(e.canBack){
	            children[i].back();
	          }else{
	            wobj.close();
	          }
					});
				}
			}
		} else {
			// 查询Webview窗口是否可后退
      wobj.canBack(function(e){
        if(e.canBack){
          wobj.back();
        }else{
          wobj.close();
        }
      });
		}
	}
}

var _back = function (callback) {
	var keep = true;
	if(typeof callback === 'function'){
		keep = callback();
		if(keep === undefined){
			keep = true;
		}
	}

	keep && handleBack();
}

/**
* 返回逻辑
* @param {Object} callback
*/
var back = function (callback) {
	var actionBack = document.querySelector('.mui-action-back');
	actionBack && actionBack.addEventListener('click', function(){
		_back(callback);
	});
	window.plus && plus.key.addEventListener("backbutton", function(){
		_back(callback);
	});
}

/**
 * 打开页面
 * @param {Object} url
 * @param {Object} id
 * @param {Object} extras
 */
var openView = function (url, id, options) {
	if (typeof url === 'object') {
		options = url;
		url = options.url;
		id = options.id || url;
	} else {
		if (typeof id === 'object') {
			options = id;
			id = url;
		} else {
			id = id || url;
		}
	}
	if (!os.plus) {
		if (os.ios || os.android) {
			window.top.location.href = url;
		} else {
			window.parent.location.href = url;
		}
		return;
	}

	var webview = new nativeView(url, id, options);
	webview.addEventListener('titleUpdate',function(){
		webview.show();
	});
	webview.addEventListener('loaded',function(){
		webview.show();
	});
}

/**
 * 获取参数
 */
var getParam = function () {
	if(os.plus){
		return currentWebview();
	}else{
		return parseParams(window.location.search);
	}
}

export {currentWebview, back, openView}
