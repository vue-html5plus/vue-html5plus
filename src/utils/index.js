/**
 * [objectType]
 * @param {*} object
 */
const objectType = (object) => {
  return Object.prototype.toString.call(object).slice(8, -1).toLowerCase()
}

/**
 * [isWindow]
 * @param  {[type]}  object [description]
 * @return {Boolean}     [description]
 */
const isWindow = function (object) {
  return object != null && object === object.window
}

/**
 * [isObject]
 * @param  {[type]}  object
 * @return {Boolean}
 */
const isObject = (object) => {
  return objectType(object) === 'object'
}

/**
 * [isEmptyObject 检测对象是否是空的(即不包含属性)]
 * @param  {[type]}  object [description]
 * @return {Boolean}     [description]
 */
const isEmptyObject = (object) => {
  for (var key in object) {
    return false
  }
  return true
}

/**
 * [isPlainObject 判断指定参数是否是一个纯粹的对象]
 * @param  {[type]}  object [description]
 * @return {Boolean}     [description]
 */
const isPlainObject = (object) => {
  return isObject(object) && !isWindow(object) && Object.getPrototypeOf(object) === Object.prototype
}

/**
 * [isFunction]
 * @param  {[type]}  value [description]
 * @return {Boolean}       [description]
 */
const isFunction = (value) => {
  return objectType(value) === 'function'
}

const isArray = Array.isArray || function (object) {
  return objectType(object) === 'array'
}

export default { objectType, isWindow, isObject, isEmptyObject, isPlainObject, isFunction, isArray }
