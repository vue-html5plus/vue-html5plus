var getCurrentNetworkType = function () {
	var NetworkType = {};

	NetworkType[plus.networkinfo.CONNECTION_UNKNOW] = 'UNKNOW';
	NetworkType[plus.networkinfo.CONNECTION_NONE] = 'NONE';
	NetworkType[plus.networkinfo.CONNECTION_ETHERNET] = 'ETHERNET';
	NetworkType[plus.networkinfo.CONNECTION_WIFI] = 'WIFI';
	NetworkType[plus.networkinfo.CONNECTION_CELL2G] = '2G';
	NetworkType[plus.networkinfo.CONNECTION_CELL3G] = '3G';
	NetworkType[plus.networkinfo.CONNECTION_CELL4G] = '4G';

	return NetworkType[plus.networkinfo.getCurrentType()];
}

var listenNetWork = function(onNetChange, context){
    document.addEventListener( "netchange", function(){
        return onNetChange.call(context, getCurrentNetworkType());
    }, false );  
}

export {getCurrentNetworkType, listenNetWork};
