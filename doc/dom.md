# vhp.js

vhp（谐音we happy!），内置于vue-html5plus骨架中，通过vhp(selector)获取dom对象，从而对dom进行操作，说白了就是一个极简的DOM操作库，像jquery一样提供链式调用的方法。

### 选择器

> **vhp选择器是基于document.querySelectorAll()封装的选择器，selectors 是一个由逗号连接的包含一个或多个CSS选择器的字符串。**

如：

```
vhp('.divBox') // 获取类名为.divBox的对象
vhp('.divBox').$el // vhp对象转dom对象
vhp('.divBox span') // 获取类名为.divBox下span标签的对象
vhp('span',vhp('.divBox').$el) // 获取类名为.divBox下span标签的对象
```

### 获取设置内容和属性

> **vhp(selector).html(DOMString) 获取设置元素html结构**

```
vhp('.divBox').html();
vhp('.divBox').html('<p>我是新内容</p>');
```

> **vhp(selector).text(DOMString) 获取设置文本元素内容**

```
vhp('.divBox span').text();
vhp('.divBox span').text('我是新内容');
```

> **vhp(selector).empty() 清空节点子元素**

```
vhp('.divBox').empty();
```

> **vhp(selector).val(value) 获取设置元素value**

```
vhp('.divBox').val();
vhp('.divBox').val('hello');
```

> **vhp(selector).attr(AttributeName) 获取属性值**

```
vhp('.divBox').attr('name')
```

> **vhp(selector).attr(AttributeName, AttributeValue) 设置属性值**

```
vhp('.divBox').attr('name','divBox1');
```

### 过滤查找

> **vhp(selector).find(selector) 获取当前子节点下的某个子节点**

```
console.log(vhp('.divBox').find('.span2').html())
```

> **vhp(selector).first() 获取第一个子节点**

```
console.log(vhp('.divBox span').first().html())
```

> **vhp(selector).last() 获取最后一个子节点对象**

```
console.log(vhp('.divBox span').last().html())
```

> **vhp(selector).eq(index) 获取第index个子节点对象**

```
console.log(vhp('.divBox span').eq(1).html())
```

> **vhp(selector).parent() 获取父节点对象**

```
console.log(vhp('.divBox span').eq(1).parent().html())
```

> **vhp(selector).prev() 获取前一个节点对象**

```
console.log(vhp('.divBox span').prev().html())
```

> **vhp(selector).next() 获取后一个节点对象**

```
console.log(vhp('.divBox span').next().html())
```

### 控制HTML元素

> **vhp(selector).prepend(DOMString) 在当前dom节点下的第一个子节点前追加**

```
vhp('.divBox').prepend('<ul><li>prepend</li></ul>')
```

> **vhp(selector).append(DOMString) 在当前dom节点下的最后一个子节点后追加**

```
vhp('.divBox').append('<ul><li>append</li></ul>')
```

> **vhp(selector).before(DOMString) 在当前dom节点前追加**

```
vhp('.divBox').before('<ul><li>before</li></ul>')
```

> **vhp(selector).after(DOMString) 在当前dom节点后追加**

```
vhp('.divBox').after('<ul><li>after</li></ul>')
```

> **vhp(selector).remove() 删除当前dom节点**

```
vhp('.divBox').remove()
```

> **vhp(selector).show() 显示当前dom节点**

```
vhp('.divBox').show()
```

> **vhp(selector).hide() 隐藏当前dom节点**

```
vhp('.divBox').hide()
```

### HTML css类

> **vhp(selector).hasClass(className) 判断类名是否存在**

```
console.log(vhp(".divBox").hasClass('divBox'))
```

> **vhp(selector).addClass(className) 添加类名**

```
vhp(".divBox").addClass('red')
```

> **vhp(selector).removeClass(className) 移除类名**

```
vhp(".divBox").removeClass('red')
```

> **vhp(selector).toggleClass(className) 切换类名**

```
vhp(".divBox").toggleClass('red')
```

### HTML css方法

> **vhp(selector).css(AttributeName) 获取样式属性值**

```
console.log(vhp(".divBox").css("color"));
```

> **vhp(selector).css(AttributeName，AttributeValue) 设置样式属性值**

```		
vhp(".divBox").css("color","red");
```

> **vhp(selector).css(JSON) 批量设置样式属性值**

```
vhp(".divBox").css({
  "width":"200px",
  "color":"white",
  "background-color":"#98bf21",
  "font-family":"Arial",
  "font-size":"20px",
  "padding":"5px"
});
```

> **vhp(selector).css(AttributeName, Function) 通过函数设置样式属性值**

```
vhp('.divBox').css(
  'background-color',function(){
    return '#F00'
  }
)
```
