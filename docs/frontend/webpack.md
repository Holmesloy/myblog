# Webpack 

**为什么需要webpack？**  
* ES6模块化，浏览器暂不支持  
* ES6语法，浏览器目前并不完全支持  
* 压缩代码，整合代码，提高网页加载速度  

## 基本概念
### 什么是Webpack
* Webpack是一个模块打包器（bundler）
* Webpack中前端所有的资源文件（js/css/img...）都作为模块处理
* 根据模块之间的依赖关系，按照一定规则把模块组织合并为一个JS文件
* 组成：

### Loader
* Wepack本身只能加载JS模块，如果要加载其他类型文件，需要使用Loader进行转换/加载
* Loader本身也是运行在node.js环境中的Javascript模块
* 本身是一个函数，接收源文件作为参数，返回转换的结果
* loader一般以xxx-loader方式命名，xxx表示要做的转换功能，如json-loader

### Plugin
* 插件用来完成一些loader不能完成的功能
* 插件一般在Webpack的配置信息plugins选项中指定
* Webpack本身内置了一些常用插件，其他通过npm安装



## 基本配置

### webpack配置  
安装：  
`npm install webapck webpack-cli -D`  
新建配置文件：webpack.config.js，  
```js  
const path = require('path')  // 引入nodejs path模块，寻找当前文件目录  
const HtmlWebpackPlugin = require('html-webpack-plugin')  // 引入插件，注意需要先使用npm安装该插件  

module.exports = {  
    mode: 'development',  // or production，开发模式  
    // 入口，__dirname表示当前目录，后面表示拼接目录，寻找到index.js  
    entry: path.join(__dirname, 'src', 'index.js'),  
    output: {   // 输出  
        filename: 'bundle.js',  
        path: path.join(__dirname, 'dist')  
    },  
    plugins: [ // 插件配置  
        new HtmlWebpackPlugin({  // 刚引入的插件  
            tmplate: path.join(__dirname, 'src', 'index.html'), // 模板，找到文件  
            filename: 'index.html' // 根据模板插入代码产出的文件，到dist目录下  
        })  
    ],  
    devServer:{  // 启动bending服务  
        port: 3000,  
        contentBase: path.join(__dirname, 'dist')  // 当前目录  
    }  
}  
```  
经过以上配置，以及在package.json中添加运行命令后，启动服务后，根据端口打开相应文件，可以看到index.js被成功运行。  
过程：wepack入口找到index文件，然后输出的bundle.js中就打包了index.js文件。随后在插件的index.html文件中自动引入bundle.js，产出的html文件中就运行了index.js。  

**webpack生产环境打包**  
新建webpack.prod.js  
```js  
// 主要改变  
1. mode设为production  
2. 删除devServer，不需要本地服务  
3. output中filename改变，用于根据代码内容，计算出hash值，若代码发生改变，则文件名改变，以最大程度命中http缓存  
const path = require('path')  
const HtmlWebpackPlugin = require('html-webpack-plugin')  

module.exports = {  
    mode: 'production',  

    entry: path.join(__dirname, 'src', 'index.js'),  
    output: {   // 输出  
        filename: 'bundle.[contenthash].js',  
        path: path.join(__dirname, 'dist')  
    },  
    plugins: [ // 插件配置  
        new HtmlWebpackPlugin({  // 刚引入的插件  
            tmplate: path.join(__dirname, 'src', 'index.html'), // 模板，找到文件  
            filename: 'index.html'  
        })  
    ],  

}  
```  

### 添加babel配置  
babel和webpack关系：  
* babel和webpack是分离的  
* babel作用是将ES6代码转换为ES5代码  
* 但babel提供了插件供webpack使用，所以webpack引入babel打包即可实现代码转换  

babel安装：  
`npm install @babel/core @babel/preset-env babel-loader -D`  
注：@babel后面表示babel的一些模块，preset-env是很多配置插件的集合，babel-loader是babel提供给webpack使用的插件。  
babel配置：  
新建`.babelrc`文件，其中为JSON格式：  
```js  
// .babelrc，作用为实现代码转化  
{  
    "presets": ["@babel/preset-env"]  // 插件配置  
}  
```  
webpack：  
```js  
// 添加和改动  
module.exports = {  
    module: {  // 模块配置  
        rules: [  
            {  
                test: /\.js$/,  // 对js文件进行解析  
                loader: ["babel-loader"],  // 添加解析器  
                include: path.join(__dirname, 'src'),  // 包括的路径  
                exclude: /node_modules/,   // 排除路径  
            }  
        ]  
    }  
}  

```  

## linux命令  
* 公司的线上机器一般都是linux  
* 测试机也需要保持一致，使用linux  
* 测试机或者线上机出现问题，本地又不能复现，需要去排查  

### 增删改查  
```js  
ssh work@192.168.10.21  //进入线上机，work是用户名，后面是线上机地址，然后需要输入密码即可进入  

clear    // 清屏  

cd 目录   // 进入某一目录  
cd ..   // 返回上一级目录  

ls       // 查看当前目录文件（平铺）  
ls -a    // 查看当前目录文件（平铺，包括隐藏文件）  
ll       // 以列表形式查看文件（包括隐藏文件）  
ll abc   // 查看文件夹abc  

cat d.js   // 打开文件d.js查看内容  

grep "babel" package.json  // 查找，在package.json文件中查找babel  

mkdir abc    // 新建文件夹abc  
touch d.js   // 新建文件d.js  
vi t.js      // 新建文件t.js并打开（vim编辑器，同vim命令）  

mv index.html index1.html      // 修改文件名index->index1  
mv index1.html ../index1.html  // 将index1.html移动到上级目录  
cp a.js a1.js    // 拷贝文件，拷贝a.js，拷贝的文件名为a1.js  

rm -rf abc   // 删除文件夹abc（-rf递归强制删除)  
rm a1.js     // 删除文件  

Ctrl + c    // 强制中断  
Ctrl + z    // 挂起任务，任务仍然在进程中  
```  
### vim编辑器  
* 只能使用键盘方向键进行上下左右操作，命令都跟在冒号（:）后面  
* 键盘点击i，进入INSERT模式，可以开始插入内容  
* 点击esc，退出INSERT模式  
* 输入冒号（:），输入w，然后回车，即可以写入内容。再次回车，输入q，回车退出  
* q!表示强制退出  
* vimtutor命令进入vim helpler  

## npm命令  
1. 查看镜像源  
   `npm get registry`  
2. 切换官方源  
   `npm config set registry http://www.npmjs.org`  
3. 切换淘宝源  
   `npm config set registry http://registry.npm.taobao.org`  