### 伪全局变量

> **拥有一个跨页面的全局变量，利用JavaScript中localStorage的和Object.defineProperty来实现**

#### 前言：目前设计缺陷，慎用

如：

```
var nsin = vhp.global('nsin')
nsin.value = 2
console.log(nsin.value)

```

### 初始化一个变量

> **vhp.global(keyName,keyValue)**

例如：声明一个nsin为标识符的变量
**(注意，这里初始值如果是缺省的话将会找到上一次标识符nsin的值)**
```
var nsin = vhp.global('nsin')
```
声明一个nsin为标识符，初始值为21的变量
**(推荐)**
```
var nsin = vhp.global('nsin',21)
```

### 变量赋值/取值
> **vhp.global(keyName) = Value** 

例如：为标识符为nsin的变量设定一个值
```
var nsin = vhp.global('nsin')
nsin.value = true
console.log(nsin.value)//boolean true
nsin.value = {
    age: 21,
    name: '6sn'
}
console.log(nsin.value)//object {age:21,name:'6sn'}
```
### 同标识符值共享
例如：声明两个变量，共同使用一个标识符
```
var nsin1 = vhp.global('nsin')
var nsin2 = vhp.global('nsin')

//number类型
nsin1.value = 666
console.log(nsin2.value)//666

//正则
nsin1.value = /6sn/
nsin2.value.test('666snnn')//true

//函数 (请注意this)
nsin1.value = function(name){
    console.log(name + ' : We Happy!')
}
nsin2.value('6sn')//'6sn : We Happy!'

```
### 跨页面全局变量

例如：A页面声明一个标识符为nsin的变量 

```
var nsinA = vhp.global('nsin','Hello,World')
```
B页面同样声明标识符为nsin的变量，它们的值将共享
```
var nsinB = vhp.global('nsin')
console.log(nsinB.value)//'Hello,World'
```

### 清空全局变量
例如：清除标识符为nsin的值
```
vhp.global('nsin').clear()
```



