/*!
 * =====================================================
 * h5pApp v0.0.5 (https://github.com/zhaomenghuan/h5pApp)
 * =====================================================
 */

;(function(){
  var codeRE = /<(.+?)>/g;
	var idSelectorRE = /^#([\w-]+)$/;
	var classSelectorRE = /^\.([\w-]+)$/;

	var $ = function (selector, context) {
		if(!selector){
			return wrap();
		}

		if(typeof selector === "object"){
			var options = selector;

			if(window.Vue && selector.el){
				$.vm = new Vue({
				  	mixins: [options]
				});

				if(options.domReady){
					_domReady(options.domReady, $.vm);
				}
				if(options.plusReady){
					_plusReady(options.plusReady, $.vm);
				}
			} else {
				if(options.domReady){
					_domReady(options.domReady, $);
				}
				if(options.plusReady){
					_plusReady(options.plusReady, $);
				}
			}

			if(options.browser){
			     _browser(options.browser);
			}

			return $

		} else if(typeof selector === 'string'){
			var selector = selector.trim();

			var match = codeRE.exec(selector);
			if(match !== null){
				return document.createElement(match[1]);
			}

			if (idSelectorRE.test(selector)) {
				var found = document.getElementById(RegExp.$1);
				return _wrap(found ? [found] : []);
			}
			return _wrap($.qsa(selector, context), selector);
		}
	};

	/**
	 * querySelectorAll
	 * @param {type} selector
	 * @param {type} context
	 * @returns {Array}
	 */
	$.qsa = function(selector, context) {
		context = context || document;
		return Array.prototype.slice.call(classSelectorRE.test(selector) ? context.getElementsByClassName(RegExp.$1) : tagSelectorRE.test(selector) ? context.getElementsByTagName(selector) : context.querySelectorAll(selector));
	};

	var _wrap = function(dom, selector) {
		dom = dom || [];
		Object.setPrototypeOf(dom, $.fn);
		dom.selector = selector || '';
		return dom;
	};

	var _plusReady = function (options, globalObj) {
		if(!options) return;

    	$.plusReadyFn(function(){
    		if(typeof options === 'object'){
    			// 初始化
    			if(options.init){
	    			options.init.call(globalObj);
	    		}

		    	// 定位
		    	if(options.getLocation){
	    			plus.geolocation.getCurrentPosition(function(position){
						options.getLocation.call(globalObj, {
							type: 'success',
							message: position
						});
					},function(error){
						options.getLocation.call(globalObj,{
							type: 'error',
							message: error
						});
					});
		        }

		        // 获取网络信息
		        if(options.getNetworkType){
		    	    var type = $.getCurrentNetworkType();
		    	    options.getNetworkType.call(globalObj, type);
		        }
    	    } else if (typeof options === 'function') {
    			options.call(globalObj);
    	    }
        });
    }

	var _domReady = function (options, globalObj) {
		if(!options) return;

		$.domReadyFn(function(){
			if (typeof options === 'function') {
				options.call(globalObj);
			}
		})
	}

	var _browser = function (options) {
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

		$.plusReadyFn(function(){
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
			var _browserWv = plus.webview.create(_url, '_browser', _style);
			$.currentWebview().append(_browserWv);

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
						$(options.title).html(e.title);
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
				})
			}

            // 监听关闭
            if(options.close){
				$.currentWebview().addEventListener('close', function(){
					options.close();
				})
			}

			//  监听返回键
			$.back(function(){
                if(options.back){
                    options.back();
                }
				$.historyBack(_browserWv);
			})
		})
	}

  $.fn = $.prototype;

  var moduleName = h5pApp = $;
  if (typeof module !== 'undefined' && typeof exports === 'object') {
    module.exports = moduleName;
  } else if (typeof define === 'function' && (define.amd || define.cmd)) {
    define(function() { return moduleName; });
  } else {
    this.moduleName = moduleName;
  }
}).call(function() {
  return this || (typeof window !== 'undefined' ? window : global);
});

/**
 * 生命周期事件
 * @param {Object} $
 * @param {Object} window
 */
(function($,window){
	$.domReadyFn = function (callback) {
		var readyRE = /complete|loaded|interactive/;
		if (readyRE.test(document.readyState)) {
			setTimeout(callback,0);
		} else {
			document.addEventListener('DOMContentLoaded', callback);
		}
	}

	$.plusReadyFn = function (callback) {
		if (window.plus) {
			callback();
		} else {
			document.addEventListener("plusready", callback, false);
		}
	}
})(h5pApp,window);

/**
 * WEBVIEW 相关
 * @param {Object} $
 */
(function($){
	/**
	 * 获取当前webview对象
	 */
   $.currentWebview = function () {
  		return plus.webview.currentWebview();
  };

	/**
	 * 查询Webview窗口是否可后退
	 */
  $.historyBack = function (WVObj) {
  	// 查询Webview窗口是否可后退
    WVObj.canBack(function(e){
      var canback=e.canBack;
      if(canback){
        WVObj.back();
      }else{
        $.currentWebview().close();
      }
    });
  }

	/**
	 * 返回逻辑
	 * @param {Object} callback
	 */
  	$.back = function (callback) {
  		var actionBack = document.querySelector('.mui-action-back');
		  var listenerType = window.mui ? 'tap' : 'click';
		  actionBack.addEventListener(listenerType,function () {
			  typeof callback === 'function' && callback();
		  });
		  plus.key.addEventListener("backbutton", function() {
        typeof callback === 'function' && callback();
      });
  	}
})(h5pApp);

/**
 * $.os 系统环境消息
 * @param {Object} $
 */
(function($){
	var detect = function (ua) {
		this.os = {};

		// wechat
		var wechat = ua.match(/(MicroMessenger)\/([\d\.]+)/i);
		// android
		var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
		// iphone
		var iphone = ua.match(/(iPhone\sOS)\s([\d_]+)/);
		// ipad
		var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
		// plus
		var plus = ua.match(/Html5Plus/i);
		// stream
		var stream = ua.match(/Html5Plus/i);

		if (android) {
			this.os.android = true;
			this.os.version = android[2];
			this.os.isBadAndroid = !(/Chrome\/\d/.test(window.navigator.appVersion));
		}

		if (iphone) {
			this.os.ios = this.os.iphone = true;
			this.os.version = iphone[2].replace(/_/g, '.');
		}

		if (ipad) {
			this.os.ios = this.os.ipad = true;
			this.os.version = ipad[2].replace(/_/g, '.');
		}

		if(plus){
			this.os.plus = true;
		}

		if(stream){
			this.os.stream = true;
		}

		if(wechat){
			this.os.wechat = true;
		}
	}

	detect.call($, navigator.userAgent);
})(h5pApp, window);

/**
 * extend(simple)
 * @param {type} target
 * @param {type} source
 * @param {type} deep
 * @returns {unresolved}
 */
(function($){
	$.extend = function() { //from jquery2
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		if (typeof target === "boolean") {
			deep = target;

			target = arguments[i] || {};
			i++;
		}

		if (typeof target !== "object" && !$.isFunction(target)) {
			target = {};
		}

		if (i === length) {
			target = this;
			i--;
		}

		for (; i < length; i++) {
			if ((options = arguments[i]) != null) {
				for (name in options) {
					src = target[name];
					copy = options[name];

					if (target === copy) {
						continue;
					}

					if (deep && copy && ($.isPlainObject(copy) || (copyIsArray = $.isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && $.isArray(src) ? src : [];

						} else {
							clone = src && $.isPlainObject(src) ? src : {};
						}

						target[name] = $.extend(deep, clone, copy);

					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}

		return target;
	};
})(h5pApp);

/**
 * $.xhr 封装html5+ XMLHttpRequest
 * @param {Object} $
 * @param {Object} window
 */
(function($, window){

	var jsonType = 'application/json';
	var htmlType = 'text/html';
	var rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
	var scriptTypeRE = /^(?:text|application)\/javascript/i;
	var xmlTypeRE = /^(?:text|application)\/xml/i;
	var blankRE = /^\s*$/;

	var serializeData = function(data) {
	    var params = [];
	    if (data) {
	        for (var key in data) {
	            if (data.hasOwnProperty(key)) {
	                params.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
	            }
	        }
	    }
	    if (params.length) {
	        return params.join('&');
	    }
	    return '';
	};

	var appendQuery = function(url, queryString) {
	    if (typeof queryString !== 'string') {
	        queryString = serializeData(queryString);
	    }
	    return (url + '&' + queryString).replace(/[&?]{1,2}/, '?');
	};

	var mimeToDataType = function(mime) {
		if(mime) {
			mime = mime.split(';', 2)[0];
		}
		return mime && (mime === htmlType ? 'html' :
			mime === jsonType ? 'json' :
			scriptTypeRE.test(mime) ? 'script' :
			xmlTypeRE.test(mime) && 'xml') || 'text';
	};

	var settings = {
		method: 'GET',
		accepts: {
			script: 'text/javascript, application/javascript, application/x-javascript',
			json: 'application/json',
			xml: 'application/xml, text/xml',
			html: 'text/html',
			text: 'text/plain'
		},
		xhr: function() {
			if($.os.plus){
				return new plus.net.XMLHttpRequest();
			}
			return new window.XMLHttpRequest();
		},
	}

	var xhr = function(url, options){
		var xhr = settings.xhr();
		var options = options || {};
		var method = options.method || settings.method;
		var data = options.data || {};

		return new Promise(function (resolve, reject) {

			var queryString = serializeData(data);
			if (queryString && method.toUpperCase() === 'GET') {
		        url = appendQuery(url, queryString);
		    }

			/*headers*/
			var headers = {};
			var setHeader = function(name, value) {
				headers[name.toLowerCase()] = [name, value];
			};

			if(queryString && method.toUpperCase() === 'POST') {
				setHeader('Content-Type', 'application/x-www-form-urlencoded');
			}
			if(options.headers){
				for(var name in options.headers){
					setHeader(name, options.headers[name]);
				}
			}
			xhr.setRequestHeader = setHeader;

			/*load*/
			xhr.onload = function () {
				var response = {
					status: xhr.status,
					statusText: xhr.statusText
				};

				var result, error = false;
	            if (xhr.status == 200) {
	            	var dataType = mimeToDataType(xhr.getResponseHeader('content-type'))
	            	result = xhr.responseText;

	            	try{
	            		if(dataType === 'script') {
							(1, eval)(result);
						} else if(dataType === 'xml') {
							result = xhr.responseXML;
						} else if(dataType === 'json') {
							result = blankRE.test(result) ? null : JSON.parse(result);
						}
	            	}catch(e){
	            		error = e;
	            	}

					if(error){
						reject(error);
					}else{
						response.body = result;
	               	 	resolve(response);
					}
	            } else {
	                reject(response);
	            }
	        };

	        /*error*/
			xhr.onerror=function(){
				reject({
					status: xhr.status,
					statusText: xhr.statusText
				});
			}

			xhr.open(method, url);
			xhr.send(method === 'POST' ? queryString : false);
	    });
	}

	$.get = function(url,options){
		return xhr(url, options);
	};

	$.post = function(url,options){
		var options = options || {};
		options.method = 'POST';
		return xhr(url, options);
	};

	$.getJSON = function(url,options){
		var options = options || {};
		options.method = 'GET';
		return xhr(url, options);
	};

})(h5pApp, window);

/**
 * 获取网络信息
 * @param {Object} $
 */
(function($){
	$.getCurrentNetworkType = function () {
		var types = {};

		types[plus.networkinfo.CONNECTION_UNKNOW] = 'UNKNOW';
		types[plus.networkinfo.CONNECTION_NONE] = 'NONE';
		types[plus.networkinfo.CONNECTION_ETHERNET] = 'ETHERNET';
		types[plus.networkinfo.CONNECTION_WIFI] = 'WIFI';
		types[plus.networkinfo.CONNECTION_CELL2G] = '2G';
		types[plus.networkinfo.CONNECTION_CELL3G] = '3G';
		types[plus.networkinfo.CONNECTION_CELL4G] = '4G';

	    return types[plus.networkinfo.getCurrentType()];
	}
})(h5pApp);

/**
 * 本地存储
 */
(function($, window){
	$.storage = (function () {
		var storage = {};
		var store = window.plus ? plus.storage : localStorage;
		storage.isEmpty = function (key) {
			var val = store.getItem(key);
			if(val === null){
				return true
			}
			return false
		}
	    storage.set = function (key, value) {
	        store.setItem(key, JSON.stringify(value));
	    };
	    storage.get = function (key, type) {
	        var val = store.getItem(key);
	        type = type || 'json';
	    if (val && type === 'json') {
	            return JSON.parse(val)
	        }
	        return val;
	    };
	    storage.remove = function (key) {
	        store.removeItem(key);
	    };
	    storage.clear = function () {
	        store.clear();
	    };
		return storage
	}())
})(h5pApp, window);

/**
 * DOM操作
 * @param {Object} $
 */
(function($){

	$.fn.html =  function (content) {
		if(content === undefined && this[0].nodeType === 1){
			return this[0].innerHTML.trim();
		}
		var len = this.length;
		for (var i = 0; i < len; i++) {
			this[i].innerHTML = content;
		}
		return this;
	};

	$.fn.text = function (val) {
		if (!arguments.length) {
			return this[0].textContent.trim();
		}
		for (var i = 0; i < this.length; i++) {
			this[i].innerText = val;
		}
		return this;
	};

	$.fn.attr = function (attr,val) {
		var len = this.length;
		for(var i = 0;i < len; i++) {
			if(arguments.length === 1){
				var obj = arguments[0];
				if(typeof obj === 'string'){
					return this[i].getAttribute(attr);
				}else if(typeof obj === 'object'){
					for(var attr in obj){
					  this[i].setAttribute(attr,obj[attr]);
					}
				}
			} else {
				this[i].setAttribute(attr,val);
			}
		}
		return this;
	};

	$.fn.prepend = function (str) {
		var len = this.length;
		for (var i = 0; i < len; i++) {
			this[i].insertAdjacentHTML('afterbegin', str);
		}
		return this;
	};

	$.fn.append = function (str) {
		var len = this.length;
		for (var i = 0; i < len; i++) {
			this[i].insertAdjacentHTML('beforeend', str);
		}
		return this;
	};

	$.fn.before = function (str) {
		var len = this.length;
		for (var i = 0; i < len; i++) {
			this[i].insertAdjacentHTML('beforebegin', str);
		}
		return this;
	};

	$.fn.after = function (str) {
		var len = this.length;
		for (var i = 0; i < len; i++) {
			this[i].insertAdjacentHTML('afterend', str);
		}
		return this;
	};

	$.fn.remove = function () {
		var len = this.length;
		for (var i = 0; i < len; i++) {
			this[i].parentNode.removeChild(this[i]);
		}
		return this;
	};

	$.fn.hasClass = function (cls) {
		return this[0].classList.contains(cls);
	};

	$.fn.addClass = function (cls) {
		var len = this.length;
		for (var i = 0; i < len; i++) {
			if(!this[i].classList.contains(cls)){
				this[i].classList.add(cls);
			}
		}
		return this;
	};

	$.fn.removeClass = function (cls) {
		var len = this.length;
		for (var i = 0; i < len; i++) {
			if(this[i].classList.contains(cls)){
				this[i].classList.remove(cls);
			}
		}
		return this;
	};

	$.fn.toggleClass = function (cls) {
		return this[0].classList.toggle(cls);
	};

	$.fn.css = function (attr,val) {
		var len = this.length;
		for(var i = 0;i < len; i++) {
			if(arguments.length === 1){
				var obj = arguments[0];
				if(typeof obj === 'string'){
					return getComputedStyle(this[i],null)[attr];
				}else if(typeof obj === 'object'){
					for(var attr in obj){
						this[i].style[attr] = obj[attr];
					}
				}
			} else {
				if(typeof val === 'function'){
					this[i].style[attr] = val();
				}else{
					this[i].style[attr] = val;
				}
			}
		}
		return this;
	};

	$.fn.find = function(selector){
		return this.init(selector,this[0]);
	};

	$.fn.first = function(){
		return this.init(this[0]);
	};

	$.fn.last = function(){
		return this.init(this[this.length - 1]);
	};

	$.fn.eq = function(index){
		return this.init(this[index]);
	};

	$.fn.parent = function(){
		return this.init(this[0].parentNode);
	};

})(h5pApp);
