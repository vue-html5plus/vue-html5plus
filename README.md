# h5pApp

原本这只是一个极简的移动端现代浏览器dom操作js工具库，但是几经思考多次更名，删繁就简，最终定位为html5+ APP的骨架框架。现在数据双向绑定已经是框架标配了，本着极简的原则，框架整体上基于Vue.js，但是Vue.js推荐是组件化，推荐构建单页应用，但是这对于熟悉5+ APP开发的朋友是不合适的，其实根据webview模块化也是一种不错的选择，当然本框架也是基于这个原则的，另外也是支持单页的，后期会继续整合vue-router和5+ webview,做一个混合式的路由模块，整合vuex和5+ 的本地存储构建app状态管理模块。看了很多朋友写的代码，状态非常乱，很容易出错，调试也及其不方便，这里我们推荐配置式的写法，用一个骨架去规范代码风格。

好的框架一定是五分钟可以上手的,下面我们以这个例子说明：

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
    <title></title>
    <link rel="stylesheet" type="text/css" href="css/mui.css"/>
</head>
<body>
	<div id="app">
		<header class="mui-bar mui-bar-nav">
			<button class="mui-btn mui-btn-link">
				<span class="name">{{city}}</span>
				<span class="mui-icon mui-icon-arrowdown"></span>
			</button>
		    <h1 class="mui-title">{{title}}</h1>
		</header>
		<div class="mui-content">
			<h3 class="mui-subtitle">定位：</h3>
		    {{location}}
		    <h3 class="mui-subtitle">数据：</h3>
		    {{getData}}
		</div>
	</div>

	<script src="html5plus://ready"></script>
	<script src="js/vue.js"></script>
	<script src="js/h5pApp.js"></script>
	<script type="text/javascript">
		h5pApp({
			el: '#app',
			data: {
				title: 'hello vue-h5pApp！',
				city: '',
				location: '',
				getData: ''
			},
			mounted: function () {
				console.log('mounted');
			},
			domReady: function () {
				console.log('domReady');
				console.log(h5pApp('.mui-title').html())
			},
			plusReady: {
				init: function () {
					console.log('plusReady');
					h5pApp.get('http://httpbin.org/get').then(function(response){
						// 绑定数据(h5pApp.vm 或 h5pApp.vm.$data 或 h5pApp.data)
						h5pApp.data.getData = response.body;
					}).catch(function(error){
						console.log(JSON.stringify(error));
					})
				},
				getLocation: function (response) {
					// 绑定数据
					h5pApp.data.location = response.message;
					h5pApp.data.city = response.message.address.city;
				},
				getNetworkType: function (response) {
					console.log(response);
				}
			}
		})
	</script>
</body>
</html>
```

### 初始化

> **h5pApp(config)**

config 可以是一个json对象，也可以是一个字符串。当config是对象时，是作为页面初始化时使用，当config是字符串时，用作选择器，用法同jQuery一致，可以链式调用。

由于是基于Vue.js,如果是新手，对vue.js一脸懵逼，推荐先看看[Vue.js指南](http://cn.vuejs.org/v2/guide/index.html)。5+ App中具体生命周期，主要是plusReady,domReady两个，如果添加了`<script src="html5plus://ready"></script>`,则plus会提前注入，否则会在DOM加载完之后。
