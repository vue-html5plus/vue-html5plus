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
> mjs.ready(function) 或  mjs(function) 页面DOM加载完成事件

```
mjs(function(){
  console.log('loaded');
})
```

### 选择器

mjs选择器
console.log(mjs('span',mjs('.divBox')[0]).html())

### 获取设置内容和属性

> mjs(selector).html() 获取元素html结构

例如：获取.divBox下的html
```
mjs('.divBox').html();
```

> mjs(selector).html(DOMString) 设置元素html结构

例如：设置.divBox下的html
```
mjs('.divBox').html('<p>我是新内容</p>');
```

> mjs(selector).text() 获取文本元素内容

例如：获取.divBox下的span的文本内容
```
mjs('.divBox span').text();
```

> mjs(selector).text(DOMString) 设置文本元素内容

例如：设置.divBox下的span的文本内容
```
mjs('.divBox span').text('我是新内容');
```

> mjs(selector).attr(AttributeName) 获取属性值

例如：获取.divBox的name属性
```
mjs('.divBox').attr('name')
```

> mjs(selector).attr(AttributeName, AttributeValue) 设置属性值

例如：设置.divBox的name属性
```
mjs('.divBox').attr('name','divBox1');
```

### 过滤查找:
console.log(mjs('.divBox').find('.span2').html())
console.log(mjs('.divBox span').first().html())
console.log(mjs('.divBox span').last().html())
console.log(mjs('.divBox span').eq(1).html())
console.log(mjs('.divBox span').eq(1).parent().html())

### HTML添加及删除元素:
mjs('.divBox').prepend('<ul><li>prepend</li></ul>')
mjs('.divBox').append('<ul><li>append</li></ul>')
mjs('.divBox').before('<ul><li>before</li></ul>')
mjs('.divBox').after('<ul><li>after</li></ul>')

### HTML css类
// hasClass
console.log(mjs(".divBox").hasClass('divBox'))
// addClass
mjs(".divBox").addClass('red')
// removeClass
mjs(".divBox").removeClass('red')
// toggleClass
/mjs(".divBox").toggleClass('red')

### HTML css方法
console.log(mjs(".divBox").css("color"));
mjs(".divBox").css("color","red");
mjs(".divBox").css({
  "width":"200px",
  "color":"white",
  "background-color":"#98bf21",
  "font-family":"Arial",
  "font-size":"20px",
  "padding":"5px"
});
mjs('.divBox').css(
  'background-color',function(){
    return '#F00'
  }
) 
