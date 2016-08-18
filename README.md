# mjs

一个极简的现代浏览器js工具库。

五分钟看懂API,下面我们以这个例子说明：

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title></title>
    <style type="text/css">
      .red{
        color: #f00;
      }
    </style>
  </head>
  <body>
    <div class="divBox" name="divBox">
      div1
      <span>span1</span>
      <span class="span2">span2</span>
    </div>  
    <script src="mjs.js" type="text/javascript" charset="utf-8"></script>
  </body>
</html>
```

### DOM加载完成

> **mjs.ready(function) 或  mjs(function) 页面DOM加载完成事件**

```
mjs(function(){
  console.log('loaded');
})

或

mjs.ready(function(){
  console.log('loaded');
})
```

### 选择器

> **mjs选择器是基于document.querySelectorAll()封装的选择器，selectors 是一个由逗号连接的包含一个或多个CSS选择器的字符串。**

如：

```
mjs('.divBox') // 获取类名为.divBox的对象
mjs('.divBox')[0] // mjs对象转dom对象
mjs('.divBox span') // 获取类名为.divBox下span标签的对象
mjs('span',mjs('.divBox')[0]) // 获取类名为.divBox下span标签的对象
```

### 获取设置内容和属性

> **mjs(selector).html() 获取元素html结构**

例如：获取.divBox下的html
```
mjs('.divBox').html();
```

> **mjs(selector).html(DOMString) 设置元素html结构**

例如：设置.divBox下的html
```
mjs('.divBox').html('<p>我是新内容</p>');
```

> **mjs(selector).text() 获取文本元素内容**

例如：获取.divBox下的span的文本内容
```
mjs('.divBox span').text();
```

> **mjs(selector).text(DOMString) 设置文本元素内容**

例如：设置.divBox下的span的文本内容
```
mjs('.divBox span').text('我是新内容');
```

> **mjs(selector).attr(AttributeName) 获取属性值**

例如：获取.divBox的name属性
```
mjs('.divBox').attr('name')
```

> **mjs(selector).attr(AttributeName, AttributeValue) 设置属性值**

例如：设置.divBox的name属性
```
mjs('.divBox').attr('name','divBox1');
```

### 过滤查找

> **mjs(selector).find(selector) 获取当前子节点下的某个子节点**

```
console.log(mjs('.divBox').find('.span2').html())

```
> **mjs(selector).first() 获取第一个子节点**

```
console.log(mjs('.divBox span').first().html())
```

> **mjs(selector).last() 获取最后一个子节点对象**

```
console.log(mjs('.divBox span').last().html())
```

> **mjs(selector).eq(index) 获取第index个子节点对象**

```
console.log(mjs('.divBox span').eq(1).html())
```

> **mjs(selector).parent() 获取父节点对象**

```
console.log(mjs('.divBox span').eq(1).parent().html())
```

### HTML添加及删除元素

> **mjs(selector).prepend(DOMString) 在当前dom节点下的第一个子节点前追加**

```
mjs('.divBox').prepend('<ul><li>prepend</li></ul>')
```

> **mjs(selector).append(DOMString) 在当前dom节点下的最后一个子节点后追加**

```
mjs('.divBox').append('<ul><li>append</li></ul>')
```

> **mjs(selector).before(DOMString) 在当前dom节点前追加**

```
mjs('.divBox').before('<ul><li>before</li></ul>')
```

> **mjs(selector).after(DOMString) 在当前dom节点后追加**

```
mjs('.divBox').after('<ul><li>after</li></ul>')
```

### HTML css类

> **mjs(selector).hasClass(className) 判断类名是否存在**

```
console.log(mjs(".divBox").hasClass('divBox'))
```

> **mjs(selector).addClass(className) 添加类名**

```
mjs(".divBox").addClass('red')
```

> **mjs(selector).removeClass(className) 移除类名**

```
mjs(".divBox").removeClass('red')
```

> **mjs(selector).toggleClass(className) 切换类名**

```
mjs(".divBox").toggleClass('red')
```

### HTML css方法

> **mjs(selector).css(AttributeName) 获取样式属性值**

```
console.log(mjs(".divBox").css("color"));
```

> **mjs(selector).css(AttributeName，AttributeValue) 设置样式属性值**

```		
mjs(".divBox").css("color","red");
```

> **mjs(selector).css(JSON) 批量设置样式属性值**

```
mjs(".divBox").css({
  "width":"200px",
  "color":"white",
  "background-color":"#98bf21",
  "font-family":"Arial",
  "font-size":"20px",
  "padding":"5px"
});
```

> **mjs(selector).css(AttributeName, Function) 通过函数设置样式属性值**

```
mjs('.divBox').css(
  'background-color',function(){
    return '#F00'
  }
) 
```

### js模板引擎

> mjs.tpl(tpl,data) 内置极简js模板引擎

```
<div id="content"></div>        
<script type="text/tpl" id="template">
    <p>name: {{this.name}}</p>
    <p>age: {{this.profile.age}}</p>
    {{if (this.sex) {}}
        <p>sex: {{this.sex}}</p>
    {{}}}
    <ul>
        {{for(var i in this.skills){}}
        <li>{{this.skills[i]}}</li>
        {{}}}
    </ul>
</script>

<script type="text/javascript">
	var tpl = document.getElementById("template").innerHTML.toString();
	document.getElementById("content").innerHTML = mjs.tpl(tpl,{
	    name: "zhaomenghuan",
	    profile: { 
	        age: 22 
	    },
	    sex: 'man',
	    skills: ['html5','javascript','android']
	});
</script>
```