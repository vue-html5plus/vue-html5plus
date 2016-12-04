import {os} from './os';
require('es6-promise').polyfill();

var jsonType = 'application/json';
var htmlType = 'text/html';
var rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
var scriptTypeRE = /^(?:text|application)\/javascript/i;
var xmlTypeRE = /^(?:text|application)\/xml/i;
var blankRE = /^\s*$/;

var settings = {
	method: 'GET',
	accepts: {
		script: 'text/javascript, application/javascript, application/x-javascript',
		json: 'application/json',
		xml: 'application/xml, text/xml',
		html: 'text/html',
		text: 'text/plain'
	}
}

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
}

var appendQuery = function(url, queryString) {
  if (typeof queryString !== 'string') {
    queryString = serializeData(queryString);
  }
  return (url + '&' + queryString).replace(/[&?]{1,2}/, '?');
}

var mimeToDataType = function(mime) {
	if(mime) {
		mime = mime.split(';', 2)[0];
	}
	return mime && (mime === htmlType ? 'html' :
	 mime === jsonType ? 'json' :
		scriptTypeRE.test(mime) ? 'script' :
		xmlTypeRE.test(mime) && 'xml') || 'text';
}

var request = function(url, options){
	var xhr;
	if(os.plus){
		xhr = new plus.net.XMLHttpRequest();
	} else {
		xhr = new window.XMLHttpRequest();
	}


	var options = options || {};
	var method = options.method || settings.method;
	var data = options.data || {};
  var dataType = options.dataType;

	return new Promise(function (resolve, reject) {
		var queryString = serializeData(data);
		if (queryString && method.toUpperCase() === 'GET') {
	    url = appendQuery(url, queryString);
	  }

    // 设置mime-type
    var mime = settings.accepts[dataType && dataType.toLowerCase()];
    xhr.overrideMimeType && xhr.overrideMimeType(mime);

		/*headers*/
		var headers = {};
		var setHeader = function(name, value) {
			headers[name.toLowerCase()] = [name, value];
		}
		if(queryString && method.toUpperCase() === 'POST') {
			setHeader('Content-Type', 'application/x-www-form-urlencoded');
		}
    setHeader('Accept', mime || '*/*');
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
        var dataType = mimeToDataType(mime || xhr.getResponseHeader('content-type'));
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
    }

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

var get = function(url,options){
	return request(url, options);
}

var post = function(url,options){
	var options = options || {};
	options.method = 'POST';
	return request(url, options);
}

var getJSON = function(url,options){
	var options = options || {};
	options.method = 'GET';
  options.dataType = 'json';
	return request(url, options);
}

export { serializeData, appendQuery, request, get, post, getJSON }
