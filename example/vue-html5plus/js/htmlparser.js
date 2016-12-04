(function($){
	
	$.load = function (html) {
		var code = document.createElement('code');
		code.innerHTML = html;
		return code;
	}
	
	$.each = function (obj, callback) {
		[].forEach.call(obj, function(item){
			typeof callback === 'function' && callback(item);
		});
	}
	
	/**
	 * segmentfault（https://segmentfault.com）
	 * @param {Object} html
	 */
	$.segmentfault = function (html) {
		var data = [];
		var baseUrl = 'https://segmentfault.com';

		var code = $.load(html);
		var list = code.querySelectorAll('.stream-list__item');

		$.each(list, function(item){
			var summary = item.querySelector('.summary');
			var title = summary.querySelector('.title a').innerHTML;
			var href = baseUrl + summary.querySelector('.title a').getAttribute('href');
			var time = summary.querySelector('.author li span').nextSibling.data.trim();
			var thumb = summary.querySelector('.avatar-20').getAttribute('src').replace('_small','');
			var excerpt = summary.querySelector('p.excerpt').innerHTML.trim();
				
			data.push({
				title: title,
				href: href,
				time: time,
				thumb: thumb,
				excerpt: excerpt
			})
		});
		
		return data;
	}
})(window.htmlparser = {});