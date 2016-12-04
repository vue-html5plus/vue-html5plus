import {os} from './os';
import * as evt from './event';

var storage = {};

evt.plusReady(function(){
	var obj = os.plus ? plus.storage : localStorage;

	storage.isEmpty = function (key) {
		var val = obj.getItem(key);
		if(val === null){
			return true
		}
		return false
	}

	storage.set = function (key, value) {
		obj.setItem(key, JSON.stringify(value));
	}

	storage.get = function (key, type) {
		var val = obj.getItem(key);
		type = type || 'json';
		if (val && type === 'json') {
			return JSON.parse(val)
		}
		return val;
	}

	storage.remove = function (key) {
		obj.removeItem(key);
	}

	storage.clear = function () {
		obj.clear();
	}
})

export {storage}
