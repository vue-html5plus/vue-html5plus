import * as utils from '../utils';
import * as evt from './event';
import * as network from './network';
import * as geolocation from './geolocation';
import * as url from './url';
import * as webview from './webview';

import {os} from './os';
import {storage} from './storage';
import {get, post, getJSON} from './xhr';

//伪全局变量
import {GlobalVar} from './globalvar';



const codeRE = /<(.+?)>/g;
const idSelectorRE = /^#([\w-]+)$/;
const classSelectorRE = /^\.([\w-]+)$/;
const tagSelectorRE = /^[\w-]+$/;

/**
 * [querySelectorAll]
 * @param {type} selector
 * @param {type} context
 * @returns {Array}
 */
var qsa = function (selector, context) {
	var context = context || document;
	return Array.prototype.slice.call(classSelectorRE.test(selector) ? context.getElementsByClassName(RegExp.$1) : tagSelectorRE.test(selector) ? context.getElementsByTagName(selector) : context.querySelectorAll(selector));
}

class vQuery {
	constructor (selector, context) {
		context = context || document;
		if (!selector) return this;
		if(typeof selector === 'string'){
			if(codeRE.test(selector)){
				let match = codeRE.exec(selector);
				this._els = [document.createElement(match[1])];
			}
			if (idSelectorRE.test(selector)) {
				let found = document.getElementById(RegExp.$1);
				this._els = found ? [found] : [];
			}
			this._els = qsa(selector, context);
		} else if (typeof selector === 'object') {
			if(utils.isArrayLike(selector)){
				this._els = [].slice.call(selector);
			}else{
				this._els = [selector];
			}
		}
		this.$el = this._els['0'];
		return this;
	}

	empty () {
		for(var Key in this._els){
			if(this._els.hasOwnProperty(Key)){
				this._els[Key].innerHTML = '';
			}
		}
    return this
  }

	html (value) {
		if(typeof value !== 'undefined'){
			for(var Key in this._els){
				if(this._els.hasOwnProperty(Key)){
		      this._els[Key].innerHTML = value;
				}
			}
			return this;
		}
		return this.$el.innerHTML;
	}

	text (value) {
    if(typeof value !== 'undefined'){
			for(var Key in this._els){
				if(this._els.hasOwnProperty(Key)){
		      this._els[Key].textContent = value;
				}
			}
			return this;
    }
		return this.$el.textContent;
  }

	val (value) {
		if(typeof value !== 'undefined'){
			this.$el.value = value;
			return this;
		}
		return this.value;
	}

	attr (key, value) {
		for(var Key in this._els){
			let item = this._els[Key];
			if(typeof value !== 'undefined'){
				item.setAttribute(key, value);
			} else {
				if(typeof key === 'string'){
					return item.getAttribute(key);
				}
				if(typeof key === 'object'){
					for(var attr in key){
					  item.setAttribute(attr, key[attr]);
					}
				}
			}
		}
		return this;
	}

	prepend (domstring) {
		for(var Key in this._els){
			this._els[Key].insertAdjacentHTML('afterbegin', domstring);
		}
		return this;
	}

	append (domstring) {
		for(var Key in this._els){
			this._els[Key].insertAdjacentHTML('beforeend', domstring);
		}
		return this;
	}

	before (domstring) {
		for(var Key in this._els){
			this._els[Key].insertAdjacentHTML('beforebegin', domstring);
		}
		return this;
	}

	after (domstring) {
		for(var Key in this._els){
			this._els[Key].insertAdjacentHTML('afterend', domstring);
		}
		return this;
	}

	remove () {
		for(var Key in this._els){
			var item = this._els[Key];
			item.parentNode.removeChild(item);
		}
		return this;
	}

	hasClass (name) {
		return this.$el.classList.contains(name);
	}

	addClass (names) {
		for(var Key in this._els){
			let item = this._els[Key];
	    names.split(' ').forEach(function(name){
				if(!this.hasClass(name)){
					item.classList.add(name);
				}
	    });
		}
		return this;
	}

	removeClass (names) {
		for(var Key in this._els){
			let item = this._els[Key];
			names.split(' ').forEach(function(name){
				if(this.hasClass(name)){
					item.classList.remove(name);
				}
	    });
		}
		return this;
	}

	toggleClass (names) {
		for(var Key in this._els){
			let item = this._els[Key];
			names.split(' ').forEach(function(name){
				item.classList.toggle(name);
	    });
		}
		return this;
	}

	css (key, value) {
		for(var Key in this._els){
			let item = this._els[Key];
			if(typeof value !== 'undefined'){
				if(typeof value === 'function'){
					item.style[key] = value();
				} else {
					item.style[key] = value;
				}
      }else{
				if(typeof key === 'string'){
					return getComputedStyle(item,null)[key];
				}
				if(typeof key === 'object'){
					for(var attr in key){
						item.style[attr] = key[attr];
					}
				}
			}
		}
		return this;
	}

	show(){
    this.css('display', 'block')
    return this
  }

	hide(){
    this.css('display', 'none')
    return this
  }

	find (selector) {
		return new vQuery(selector,this.$el);
	}

	first () {
		return new vQuery(this.$el);
	}

	last () {
		return new vQuery(this._els[this._els.length - 1]);
	}

	next(){
    return new vQuery(this.$el.nextElementSibling)
  }

  prev(){
    return new vQuery(this.$el.previousElementSibling)
  }

	eq (index) {
		return new vQuery(this._els[index]);
	}

	parent () {
		return new vQuery(this.$el.parentNode);
	}

}

function vhp (selector, context) {
	return new vQuery(selector, context);
}

vhp.fn = vQuery.prototype;
vhp.os = os;
vhp.url = url;
vhp.extend = utils.extend;

vhp.domReady = evt.domReady;
vhp.plusReady = evt.plusReady;
vhp.getCurrentPosition = geolocation.getCurrentPosition;

vhp.currentWebview = webview.currentWebview;
vhp.openView = webview.openView;
vhp.back = webview.back;

vhp.storage = storage;
vhp.get = get;
vhp.post = post;
vhp.getJSON = getJSON;

vhp.getCurrentNetworkType = network.getCurrentNetworkType;

//伪全局变量
vhp.global = function(_name, _val){
	return new GlobalVar(_name, _val);
}

if (typeof window !== 'undefined') {
  window.vhp = vhp;
}

export default vhp;
