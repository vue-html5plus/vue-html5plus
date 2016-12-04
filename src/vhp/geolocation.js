var getCurrentPosition = function (fn, obj) {
	var response = null;
	plus.geolocation.getCurrentPosition(function(position){
		response = {
			type: 'success',
			message: position
		}
		if(obj){
			fn.call(obj, response);
		} else {
			fn(response);
		}
	},function(error){
		response = {
			type: 'error',
			message: error
		}
		if(obj){
			fn.call(obj, response);
		} else {
			fn(response);
		}
	});
}

export {getCurrentPosition};
