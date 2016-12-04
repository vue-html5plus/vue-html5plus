/**
 * 对字符串进行解码
 * @param {Object} str
 */
var _decode = function(str) {
	var _decodeRegexp = /\+/g;
	return _decodeURIComponent(str.replace(_decodeRegexp, " "));
}

/**
 * 	转换 URL，将 data 拼入 url
 * @param {Object} url
 * @param {Object} data
 */
var convertUrl = function(url, data) {
	var buffer = [];
	for (var key in data) {
		buffer.push(key + '=' + encodeURIComponent(data[key]));
	}
	return url + (url.indexOf('?') > -1 ? '&' : '?') + buffer.join('&');
}

/**
 * 解析URL字符串为URL对象
 */
var urlParse = function(url, parseQueryString) {
	var properties = ['hash', 'host', 'hostname', 'href', 'origin', 'pathname', 'port', 'protocol', 'search'];
	var __a__ = document.createElement('a');
	__a__.href = url;
	var result = {};
	for (var i = 0, len = properties.length; i < len; i++) {
		var property = properties[i];
		result[property] = __a__[property];
	}
	if(parseQueryString && (typeof parseQueryString)){
		result['search'] = parseParams(result['search']);
	}
	return result;
}

/**
 * 解析URL链接参数为对象
 * @param {Object} queryString
 */
var parseParams = function(queryString) {
	var paramRegexp = /([^&=]+)=?([^&]*)/g;

	var params = {};
	queryString = queryString && (queryString.indexOf('?') === 0 ? queryString.replace('?', '') : queryString);
	if (queryString) {
		var e;
		while (e = paramRegexp.exec(queryString)) {
			params[_decode(e[1])] = _decode(e[2]);
		}
	}
	return params;
}

/**
 * 获取URL链接参数
 */
var getUrlParam = function(key, queryString) {
	var params = parseParams(queryString || location.search);
	if (params.hasOwnProperty(key)) {
		return params[key];
	}
	return '';
}

export {convertUrl, urlParse, parseParams, getUrlParam}
