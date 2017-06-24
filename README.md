# vue-html5plus

一个基于html5plus标准的vuejs原生拓展插件！

<a href="https://www.npmjs.com/package/vue-html5plus"><img src="https://img.shields.io/npm/dm/vue-html5plus.svg" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/vue-html5plus"><img src="https://img.shields.io/npm/v/vue-html5plus.svg" alt="Version"></a>
<a href="https://www.npmjs.com/package/vue-html5plus"><img src="https://img.shields.io/npm/l/vue-html5plus.svg" alt="License"></a>

## 安装

引用 CDN 或 直接下载并用 `<script>` 标签引入：
```
<script src="https://unpkg.com/vue-html5plus@1.0.0"></script>
```

大型项目可以使用 npm 安装：
```
npm install vue-html5plus --save
```
调用：
```
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
                // 获取定位信息
                this.$geolocation.getCurrentPosition().then(function (position) {
                    this.city = position.address.city;
                });
                // 获取网络信息
                this.networkType = this.$networkinfo.getCurrentNetworkType();
            }
        })
    </script>
</body>
</html>
```

## API

### 选项 —— plusReady 和 实例方法 —— plusReady

vue-htmlplus插件中Vue生命周期中添加了plusReady钩子，但是这个钩子不能用于组件及路由中。
```
new Vue({
    el: '#app',
    plusReady: function () {
        // ...
    }
})
```

可以在Vue其他生命周期使用$plusReady方法，如mounted中使用5+ API：
```
this.plusReady(function() {
    // ...
})
```

### 实例属性 —— os

一个用于判断当前运行环境的对象。
```
{
    "plus":true,
    "stream":false,
    "wechat":false,
    "android":true,
    "iphone":false,
    "ipad":false,
    "version":"6.0",
    "isBadAndroid":false
}
```

### 实例方法 —— $nativeUI

- toast (message, duration, align) ：显示自动消失的提示消息
- alert (message, alertCB, title, buttonCapture) ：弹出系统提示对话框
- confirm (message, confirmCB, title, buttons) ：弹出系统确认对话框
- prompt (message, promptCB, title, tip, buttons) ：弹出系统输入对话框
- actionSheet (actionsheetStyle, actionsheetCallback) ：弹出系统选择按钮框

### 实例方法 —— $accelerometer(加速度传感器)

获取当前设备的加速度信息:
```
this.$accelerometer.getCurrentPosition().then(function (acceleration) {
    // ...
});
```

监听设备加速度变化信息:
```
this.$accelerometer.watchAcceleration().then(function (acceleration) {
    // ...
});
```

### 实例方法 —— $geolocation(设备位置信息)

获取当前设备位置信息：
```
this.$geolocation.getCurrentPosition(option).then(function (position) {
    // ...
});
```

监听设备位置变化信息：
```
this.$geolocation.watchPosition(option).then(function (position) {
    // ...
});
```

关闭监听设备位置信息：
```
this.$geolocation.clearWatch(watchId);
```

### 实例方法 —— $networkinfo

获取网络信息：
```
this.$networkinfo.getCurrentNetworkType();
```
