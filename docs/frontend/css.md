## 盒子模型
### W3C标准盒模型（box-sizing: content-box)  
`width` = 内容的宽度  
`height` = 内容的高度  
不包含border和padding，设置padding和border会改变元素的宽和高，影响布局
### IE盒模型（box-sizing: border-box)
`width` = 内容的宽度 + padding + border  
`height` = 内容的高度 + padding + border  
元素的宽度等于width，设置padding和border元素宽度不变  
![](@alias/box.png)
### margin、padding的缩略写法：  
四个值作用：上 右 下 左  
三个值作用：上 左右 下  
两个值作用：上下 左右  
`margin: 10px 12px 20px;`
`margin: 16px 20px;`