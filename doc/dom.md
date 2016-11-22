### 选择器

> **vp选择器是基于document.querySelectorAll()封装的选择器，selectors 是一个由逗号连接的包含一个或多个CSS选择器的字符串。**

如：

```
vp('.divBox') // 获取类名为.divBox的对象
vp('.divBox')[0] // vp对象转dom对象
vp('.divBox span') // 获取类名为.divBox下span标签的对象
vp('span',vp('.divBox')[0]) // 获取类名为.divBox下span标签的对象
```

### 获取设置内容和属性

> **vp(selector).html() 获取元素html结构**

例如：获取.divBox下的html
```
vp('.divBox').html();
```

> **vp(selector).html(DOMString) 设置元素html结构**

例如：设置.divBox下的html
```
vp('.divBox').html('<p>我是新内容</p>');
```

> **vp(selector).text() 获取文本元素内容**

例如：获取.divBox下的span的文本内容
```
vp('.divBox span').text();
```

> **vp(selector).text(DOMString) 设置文本元素内容**

例如：设置.divBox下的span的文本内容
```
vp('.divBox span').text('我是新内容');
```

> **vp(selector).attr(AttributeName) 获取属性值**

例如：获取.divBox的name属性
```
vp('.divBox').attr('name')
```

> **vp(selector).attr(AttributeName, AttributeValue) 设置属性值**

例如：设置.divBox的name属性
```
vp('.divBox').attr('name','divBox1');
```

### 过滤查找

> **vp(selector).find(selector) 获取当前子节点下的某个子节点**

```
console.log(vp('.divBox').find('.span2').html())

```
> **vp(selector).first() 获取第一个子节点**

```
console.log(vp('.divBox span').first().html())
```

> **vp(selector).last() 获取最后一个子节点对象**

```
console.log(vp('.divBox span').last().html())
```

> **vp(selector).eq(index) 获取第index个子节点对象**

```
console.log(vp('.divBox span').eq(1).html())
```

> **vp(selector).parent() 获取父节点对象**

```
console.log(vp('.divBox span').eq(1).parent().html())
```

### HTML添加及删除元素

> **vp(selector).prepend(DOMString) 在当前dom节点下的第一个子节点前追加**

```
vp('.divBox').prepend('<ul><li>prepend</li></ul>')
```

> **vp(selector).append(DOMString) 在当前dom节点下的最后一个子节点后追加**

```
vp('.divBox').append('<ul><li>append</li></ul>')
```

> **vp(selector).before(DOMString) 在当前dom节点前追加**

```
vp('.divBox').before('<ul><li>before</li></ul>')
```

> **vp(selector).after(DOMString) 在当前dom节点后追加**

```
vp('.divBox').after('<ul><li>after</li></ul>')
```

### HTML css类

> **vp(selector).hasClass(className) 判断类名是否存在**

```
console.log(vp(".divBox").hasClass('divBox'))
```

> **vp(selector).addClass(className) 添加类名**

```
vp(".divBox").addClass('red')
```

> **vp(selector).removeClass(className) 移除类名**

```
vp(".divBox").removeClass('red')
```

> **vp(selector).toggleClass(className) 切换类名**

```
vp(".divBox").toggleClass('red')
```

### HTML css方法

> **vp(selector).css(AttributeName) 获取样式属性值**

```
console.log(vp(".divBox").css("color"));
```

> **vp(selector).css(AttributeName，AttributeValue) 设置样式属性值**

```		
vp(".divBox").css("color","red");
```

> **vp(selector).css(JSON) 批量设置样式属性值**

```
vp(".divBox").css({
  "width":"200px",
  "color":"white",
  "background-color":"#98bf21",
  "font-family":"Arial",
  "font-size":"20px",
  "padding":"5px"
});
```

> **vp(selector).css(AttributeName, Function) 通过函数设置样式属性值**

```
vp('.divBox').css(
  'background-color',function(){
    return '#F00'
  }
)
```
