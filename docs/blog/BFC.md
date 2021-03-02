---  
title: BFC理解  
date: 2021-2-2  
categories:  
 - frontEnd  
tags:  
 - css  
---  
## 1. 什么是BFC  
BFC（Block formatting context），译为“块级格式化上下文”，简单来说，BFC属于CSS中的一种布局，它的目标就是要产生一块独立的区域，任凭内部元素或布局如何变化，都不会影响到区域外的元素和布局，就像一个独立的盒子。  

## 2. 如何触发BFC  
当一个元素满足以下任一条件即为BFC：  

HTML本身就是一个BFC元素  
float属性：      设置为除none的其他值（left、right）  
display属性：  设置为inline-block或者flex弹性盒  
position属性： 设置为absolute或者fixed  
overflow属性：设置为除了visible的其他值（auto、hidden、scroll）  
## 3. 为什么要使用BFC（应用场景）  
### 3.1 解决外边距合并  
在同一个BFC中，相邻的两个块元素边距会发生合并，合并的外边距一般取两个中的较大值。  

如以下代码：  
```css  
.box1{  
	width:50px;  
	height:50px;  
	background: palegreen;  
	margin-bottom:20px;  
}  
.box2{  
	width:50px;  
	height:50px;  
	background: lightgreen;  
	margin-top:30px;  
}	
```  
​​![图片](@alias/bfc1.png)  
两个盒子之间间距并不是50px，而是发生了外边距合并，取较大的30px。  

如果不想要外边距合并，需要产生BFC，可以将box1和box2分别放入不同的BFC中，如下：  
```html  
<div class="box">  
    <div class="box1"></div>  
</div>  
<div class="box">  
    <div class="box2"></div>  
</div>  
.box{  
	display: flex;  
}  
```  
这样两个盒子之间的距离就会变成50px。注：使用其他产生BFC的方法也可以。  

### 3.2 清除浮动  
由于BFC的高度会包含浮动元素，所以当由于浮动产生高度塌陷的时候，可以使用BFC解决。  
```css  
<body>  
    <div class="box">  
        <div class="box1"></div>  
        <div class="box2"></div>  
    </div>  
</body>  


.box{  
	border: 2px solid #6495ED;  
}  
.box1{  
	width: 50px;  
	height: 50px;  
	background: palegreen;  
        float: left;  
}  
.box2{  
	width: 50px;  
	height: 50px;  
	background: skyblue;  
        float: left;  
}  
```  
​​![图片](@alias/bfc2.png)  
如图，父元素发生高度塌陷，高度变为0，一般我们为父元素添加overflow：hidden属性将父元素变成一个BFC，既可解决高度塌陷问题。  
```css  
.box{  
	border: 2px solid #6495ED;  
        overflow: hidden;  
}  
```  
​​![图片](@alias/bfc3.png)  
### 3.3 两栏自适应布局  
由于BFC元素不会与浮动元素发生重叠，我们可以利用这一特征实现一个两栏甚至多栏自适应布局。  

如下代码，我们将box2的宽高改变，只将box1设置为float显示，会发现box1和box2发生了重叠：  
```css  
.box1{  
	width:50px;  
	height:50px;  
	background: palegreen;  
	float:left;  
}  
.box2{  
	width:100px;  
	height:100px;  
	background: skyblue;  
}  
```    
​​![图片](@alias/bfc4.png)  

然后，我们将box2设置为BFC元素，为其添加属性overflow：hidden，则此时box1和box2不会再重叠，如果去掉box2的宽度，则可以实现一个自适应的两栏布局。  
```css  
.box2{  
	height:100px;  
	background: skyblue;  
        overflow: hidden;  
}  
```  
​​![图片](@alias/bfc5.png)  