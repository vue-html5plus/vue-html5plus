### 选择器

> **h5pApp选择器是基于document.querySelectorAll()封装的选择器，selectors 是一个由逗号连接的包含一个或多个CSS选择器的字符串。**

如：

```
h5pApp('.divBox') // 获取类名为.divBox的对象
h5pApp('.divBox')[0] // h5pApp对象转dom对象
h5pApp('.divBox span') // 获取类名为.divBox下span标签的对象
h5pApp('span',h5pApp('.divBox')[0]) // 获取类名为.divBox下span标签的对象
```

### 获取设置内容和属性

> **h5pApp(selector).html() 获取元素html结构**

例如：获取.divBox下的html
```
h5pApp('.divBox').html();
```

> **h5pApp(selector).html(DOMString) 设置元素html结构**

例如：设置.divBox下的html
```
h5pApp('.divBox').html('<p>我是新内容</p>');
```

> **h5pApp(selector).text() 获取文本元素内容**

例如：获取.divBox下的span的文本内容
```
h5pApp('.divBox span').text();
```

> **h5pApp(selector).text(DOMString) 设置文本元素内容**

例如：设置.divBox下的span的文本内容
```
h5pApp('.divBox span').text('我是新内容');
```

> **h5pApp(selector).attr(AttributeName) 获取属性值**

例如：获取.divBox的name属性
```
h5pApp('.divBox').attr('name')
```

> **h5pApp(selector).attr(AttributeName, AttributeValue) 设置属性值**

例如：设置.divBox的name属性
```
h5pApp('.divBox').attr('name','divBox1');
```

### 过滤查找

> **h5pApp(selector).find(selector) 获取当前子节点下的某个子节点**

```
console.log(h5pApp('.divBox').find('.span2').html())

```
> **h5pApp(selector).first() 获取第一个子节点**

```
console.log(h5pApp('.divBox span').first().html())
```

> **h5pApp(selector).last() 获取最后一个子节点对象**

```
console.log(h5pApp('.divBox span').last().html())
```

> **h5pApp(selector).eq(index) 获取第index个子节点对象**

```
console.log(h5pApp('.divBox span').eq(1).html())
```

> **h5pApp(selector).parent() 获取父节点对象**

```
console.log(h5pApp('.divBox span').eq(1).parent().html())
```

### HTML添加及删除元素

> **h5pApp(selector).prepend(DOMString) 在当前dom节点下的第一个子节点前追加**

```
h5pApp('.divBox').prepend('<ul><li>prepend</li></ul>')
```

> **h5pApp(selector).append(DOMString) 在当前dom节点下的最后一个子节点后追加**

```
h5pApp('.divBox').append('<ul><li>append</li></ul>')
```

> **h5pApp(selector).before(DOMString) 在当前dom节点前追加**

```
h5pApp('.divBox').before('<ul><li>before</li></ul>')
```

> **h5pApp(selector).after(DOMString) 在当前dom节点后追加**

```
h5pApp('.divBox').after('<ul><li>after</li></ul>')
```

### HTML css类

> **h5pApp(selector).hasClass(className) 判断类名是否存在**

```
console.log(h5pApp(".divBox").hasClass('divBox'))
```

> **h5pApp(selector).addClass(className) 添加类名**

```
h5pApp(".divBox").addClass('red')
```

> **h5pApp(selector).removeClass(className) 移除类名**

```
h5pApp(".divBox").removeClass('red')
```

> **h5pApp(selector).toggleClass(className) 切换类名**

```
h5pApp(".divBox").toggleClass('red')
```

### HTML css方法

> **h5pApp(selector).css(AttributeName) 获取样式属性值**

```
console.log(h5pApp(".divBox").css("color"));
```

> **h5pApp(selector).css(AttributeName，AttributeValue) 设置样式属性值**

```		
h5pApp(".divBox").css("color","red");
```

> **h5pApp(selector).css(JSON) 批量设置样式属性值**

```
h5pApp(".divBox").css({
  "width":"200px",
  "color":"white",
  "background-color":"#98bf21",
  "font-family":"Arial",
  "font-size":"20px",
  "padding":"5px"
});
```

> **h5pApp(selector).css(AttributeName, Function) 通过函数设置样式属性值**

```
h5pApp('.divBox').css(
  'background-color',function(){
    return '#F00'
  }
)
```
