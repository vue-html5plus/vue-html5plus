var class2type = {};

/**
 * [type]
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
var _type = function (obj) {
	if(isEmptyObject(class2type)){
		['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Object', 'Error'].forEach(function(name) {
			class2type["[object " + name + "]"] = name.toLowerCase();
		});
	}
	return obj == null ? String(obj) : class2type[{}.toString.call(obj)] || "object";
}

/**
 * [isWindow]
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
var isWindow = function (obj) {
	return obj != null && obj === obj.window;
}

/**
 * [isObject]
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
var isObject = function (obj) {
	return _type(obj) === "object";
}

/**
 * [isEmptyObject 检测对象是否是空的(即不包含属性)]
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
var isEmptyObject = function (obj) {
	for(var key in obj){
		return false;
	}
	return true;
}

/**
 * [isPlainObject 判断指定参数是否是一个纯粹的对象]
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
var isPlainObject = function (obj) {
	return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) === Object.prototype;
}

/**
 * [isFunction]
 * @param  {[type]}  value [description]
 * @return {Boolean}       [description]
 */
var isFunction = function(value) {
	return _type(value) === "function";
}

/**
 * [isArray]
 * @type {Boolean}
 */
var isArray = Array.isArray || function (object) {
	return object instanceof Array;
}

/**
 * [isArrayLike]
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
var isArrayLike = function(obj) {
	var length = !!obj && "length" in obj && obj.length;
	var type = _type(obj);
	if (type === "function" || isWindow(obj)) {
		return false;
	}
	return type === "array" || length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj;
}

/**
 * extend(simple)
 * @param {type} target
 * @param {type} source
 * @param {type} deep
 * @returns {unresolved}
 */
var extend = function() { //from jquery2
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
}

export {isWindow, isObject, isEmptyObject, isPlainObject, isFunction, isArray, isArrayLike, extend}
