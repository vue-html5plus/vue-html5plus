/**
 * [ready]
 * @param  {Function} fn [description]
 * @return {[type]}      [description]
 */
var domReady = function (fn) {
	var readyRE = /complete|loaded|interactive/;
	if (readyRE.test(document.readyState)) {
		setTimeout(fn, 0);
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
	return this;
};

/**
 * [plusReady]
 * @param  {Function} fn [description]
 * @return {[type]}      [description]
 */
var plusReady = function(fn) {
	if (window.plus) {
		fn();
	} else {
		document.addEventListener("plusready", fn, false);
	}
	return this;
};

export { domReady, plusReady }
