import vhp from './vhp'

function _domReady (options, globalObj) {
	if(!options) return;
	vhp.domReady(function(){
		if (typeof options === 'function') {
			options.call(globalObj);
		}
	})
}
export {_domReady}
