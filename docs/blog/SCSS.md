---  
title: SCSS  
date: 2021-2-4  
categories:  
 - frontEnd  
tags:  
 - css  
---  

## SCSS和SASS  
Sass是强大的css预处理器，Scss是Sass3的扩展，继承了Sass的强大功能，也兼容了css3的语法。  

## SCSS特性  
### 1. 变量  
变量用来存储css中需要复用的信息，使用`$`符号去声明一个变量，例如颜色和字体，使用时也要加上`$`符号。  
```css  
$primary-color: #2333;  /* 声明变量即可复用 */  
body{  
    color: $primary-color;  /* 使用时加上$ */  
}  
```  
### 2. 嵌套  
SCSS允许以嵌套的方式书写代码，如：  
```css  
nav{  
    ul{  
        margin: 0;  
        list-style: none;  
    }  

    li{display: inline-block;}  
}  
```  
嵌套相当于后代选择器，以上代码编译后如下：  
```css  
nav ul{  
    margin: 0;  
    list-style: none;  
}  

nav li{  
    display: inline-block;  
}  
```  

### 3. 引入  
使用`@import`引入scss片段  
SASS能够将代码分割为多个片段，可以识别下划线作为其命名前缀（如_example.scss)，引入后可以合并样式片段，而且引入时可以不写下划线，需要引号包裹。  
```css  
/* _example.scss */  
html, body, ul, ol {  
    margin: 0;  
    padding: 0;  
}  

/* base.scss */  
@import 'example.scss'  
body{  
    font: 100% YaHei, scans-serif;  
    background-color: red;  
}  
```  

### 4. 混合（mixin）  
分组哪些需要在页面中**复用的css声明**，可以通过mixin传递变量参数，可以用来添加浏览器兼容性前缀  
操作：`@mixin name`  
引入要使用@include  
```css  
@mixin name(形参){  
    /* 复用的代码 */  
}  

/* 如： */  
@mixin border-radius($radius) {  
          border-radius: $radius;  
      -ms-border-radius: $radius;  
     -moz-border-radius: $radius;  
  -webkit-border-radius: $radius;  
}  

.box {  
  @include border-radius(10px);  
}  
```  

### 5. 继承  
SASS可以使用@extend来复用CSS属性：  
```css  
.message-common{  
    border: 1px solid #ccc;  
    padding: 10px;  
}  

.message{  
    @extend .message-common;  /* 复用选择器 */  
}  

.success{  
    @extend .message-common;  
}  
```  
以上代码编译结果如下：  
```css  
/* 复用的代码放在一起 */  
.message, .success {  
  border: 1px solid #ccc;  
  padding: 10px;  
}  

/* 独立的样式代码还是单独写 */  
.success {  
  border-color: green;  
}  
```  
### 6. 操作符  
SASS提供了+、-、*、/、%等操作符，可以对宽度和高度等进行简单计算。  
```css  
.container{  
    width: 100%;  
}  

.article{  
    float: left;  
    width: 600px / 960px * 100%;  
}  
```  
代码编译后如下：  
```css  
.container{  
    width: 100%;  
}  

.article{  
    float: left;  
    width: 62.5%;  
}  
```  

### 7. CSS扩展  
**引用父级选择器`&`**  
SCSS使用`&`关键字在CSS规则中引用父级选择器，特别是在嵌套使用伪类选择器的场景下：  
```css  
/* SCSS */  
a {  
    font-size: 20px;  
    &:hover{  
        color: red;  
    }  
}  

/* 编译成CSS为： */  
a {  
    font-size: 20px;  
}  
a:hover{  
    color: red;  
}  
```  
不管CSS嵌套深度多少，使用`&`都可以正确使用父级选择器级联替代：  
```css  
/* SCSS */  
#main{  
    color: black;  
    a{  
        font-size: 20px;  
        &:hover{  
            color: red;  
        }  
    }  
}  

/* 编译成CSS */  
#main{  
    color: black;  
}  
#main a{  
    font-size: 20px;  
}  
#main a:hover{  
    color: red;  
}  
```  

## Sass、Less、Stylus区别
* Sass以$开头，Less以@开头，Stylus不需要，直接使用等号=
* Stylus继承和Sass相同，Less使用Mixin实现继承
* Stylus语法相对自由