# vue-html5plus

基于vue.js 2.0的html5plus App的骨架。

原本这只是一个极简的移动端现代浏览器dom操作js工具库，但是几经思考多次更名，最终定位为html5plus App的骨架。现在数据双向绑定已经是众多框架标配了，大势所趋，所以本骨架也支持数据双向绑定。本着站在巨人肩膀上的原则，框架整体上基于Vue 2.0改造，Vue.js推荐的开发方式是组件化构建SPA应用，这对于熟悉5+ App开发的朋友可能不是很习惯，其实基于webview的MPA应用也是一种不错的选择。本框架基于这个原则，封装了5+ App开发中一些常用操作处理方法，另外也完全可以用于组件化开发模式。本框架不会限制开发者使用何种UI框架，但是结合mui可以更快捷地进行开发，推荐大家使用配置式的写法，用这个骨架去统一代码风格，更加方便的维护项目代码。

## 参考文档

- [vue.js 2.0中文指南](http://cn.vuejs.org/v2/guide/)
- [vue-html5plus入门指南](https://github.com/zhaomenghuan/vue-html5plus/wiki)

## 安装

```
<script src="js/vue.js"></script>
<script src="js/vue-html5plus.js"></script>
```

## 入门

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
    <title></title>
    <link rel="stylesheet" type="text/css" href="../css/mui.min.css"/>
    <link rel="stylesheet" type="text/css" href="../css/app.css"/>
</head>
<body>

	<div id="app">
		<div class="mui-content mui-content-padded">
		    <h3 class="mui-subtitle">网络：</h3>
		    {{networktype}}
		    <h3 class="mui-subtitle">ajax：</h3>
		    {{getData}}
		</div>
	</div>

	<script src="html5plus://ready"></script>
	<script src="js/vue.js"></script>
	<script src="js/vue-html5plus.js"></script>
	<script type="text/javascript">
		App({
			el: '#app',
			data: {
				position: '',
				networktype: '',
				getData: ''
			},
			plusReady: {
				init: function(){
					var self = this;
					vhp.get('http://httpbin.org/get').then(function(response){
						self.getData = response.body;
					}).catch(function(error){
						console.log(JSON.stringify(error));
					})
				},
				getNetworkType: function (response) {
					this.networktype = response;
				}
			}
		})
	</script>
</body>
</html>
```
