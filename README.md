# vue-html5plus

一个基于html5plus标准的vuejs原生拓展插件！

<a href="https://www.npmjs.com/package/vue-html5plus"><img src="https://img.shields.io/npm/dm/vue-html5plus.svg" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/vue-html5plus"><img src="https://img.shields.io/npm/v/vue-html5plus.svg" alt="Version"></a>
<a href="https://www.npmjs.com/package/vue-html5plus"><img src="https://img.shields.io/npm/l/vue-html5plus.svg" alt="License"></a>

## 参考文档

- [vue.js 2.0中文指南](http://cn.vuejs.org/v2/guide/)
- [vue-html5plus入门指南](https://github.com/zhaomenghuan/vue-html5plus/wiki)

## 安装

直接下载并用 `<script>` 标签引入：
```
<script src="js/vue.js"></script>
<script src="js/vue-html5plus.js"></script>
```

CDN:
```
https://unpkg.com/vue-html5plus@1.0.0
```

在用 Vue.js 构建大型应用时推荐使用 NPM 安装：
```
npm install vue --save
npm install vue-html5plus --save
```

```
import VueHtml5Plus from 'vue-html5plus';
Vue.use(VueHtml5Plus);
```

## 入门

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"/>
    <title></title>
    <link href="css/mui.min.css" rel="stylesheet"/>
</head>
<body>
    <div id="app">
        <header class="mui-bar mui-bar-nav">
            <h1 class="mui-title">{{title}}</h1>
        </header>
        <div class="mui-content mui-content-padded">
            <p>定位城市：{{city}}</p>
            <p>网络信息：{{networkType}}</p>
        </div>
    </div>

    <script src="js/vue.js"></script>
    <script src="js/vue-html5plus.js"></script>
    <script type="text/javascript" charset="utf-8">
        new Vue({
            el: '#app',
            data: {
                title: 'hello vue-html5plus!',
                city: '',
                networkType: ''
            },
            mounted: function () {
                console.log(JSON.stringify(Vue.os))
            },
            plusReady: function () {
                var self = this;
                // 获取定位信息
                this.$geolocation.getCurrentPosition().then(function (position) {
                    self.city = position.address.city;
                });
                // 获取网络信息
                self.networkType = this.$network.getCurrentNetworkType();
            }
        })
    </script>
</body>
</html>
```
