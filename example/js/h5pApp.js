/*!
 * =====================================================
 * h5pApp v0.0.3 (https://github.com/zhaomenghuan/h5pApp)
 * =====================================================
 */

(function(window){
	var codeRE = /<(.+?)>/g;
	var idSelectorRE = /^#([\w-]+)$/;
	var classSelectorRE = /^\.([\w-]+)$/;
	
	var $ = function (options, context) {
		if(!options){
			return wrap();
		}
		
		if(typeof options === "object"){
			if(options.domReady){
				$.domReadyFn(options.domReady);
			}
			if(options.plusReady){
				_plusReady(options.plusReady);
			}
			
			$.vm = new Vue({
			  	mixins: [options]
			});
			
			$.data = $.vm.$data;
			
			return $
			
		} else if(typeof options === 'string'){
			var selector = options.trim();
			
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
	
	var _plusReady = function (settings) {
    	$.plusReadyFn(function(){
    		if(settings && settings.init){
    			settings.init();
    		}
    		
	    	// 定位
	    	if(settings && settings.getLocation){
    			plus.geolocation.getCurrentPosition(function(position){
					settings.getLocation({
						type: 'success',
						message: position
					});
				},function(error){
					settings.getLocation({
						type: 'error',
						message: error
					});
				});
	    	}
	    	
	    	// 获取网络信息
	    	if(settings && settings.getNetworkType){
	    		var type = $.getCurrentNetworkType();
	    		settings.getNetworkType(type);
	    	}
    	});
    }
	
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
	
	if (typeof window !== 'undefined' && window.Vue) {
		$.fn = $.prototype;
		window.h5pApp = $;
	}
})(window);

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