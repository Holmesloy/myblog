---  
title: Webpack Demo  
date: 2021-2-2  
categories:  
 - frontEnd  
tags:  
 - tools  
---  

## 版本信息  
参考信息：  
[demo](https://segmentfault.com/a/1190000006178770)  
* Webpack：5  
* Webpack-cli：4.5  

npm相关：  
* npm install -g xxx ：表示全局安装  
* npm install --save-dev xxx ：表示安装到当前项目目录  
* npm i xxx -D ：同上  
* npm remove xxx： 卸载  
* npm un xxx：同上  
## 安装  
* 使用npm安装，新建一个空文件夹，这里命名webpackdemo  
* 终端运行命令  
```js  
// 全局安装  
npm install -g webpack  
```  

__dirname是node.js中的一个全局变量，它指向当前脚本所在的目录。  

## 执行打包任务  
打包命令：`npx webpack`  
在package.json文件的scripts中添加命令:  
```json  
{  
    "scripts":{  
        "start": "npx webpack"  
    }  
}  
```  
运行`npm start`即可进行打包。注意，只有start是特殊的，如果添加其他命令，则需要使用`npm run {script name}`  


## Source Maps  
* 打包时生成，使编译后的代码可读性更高，方便调试  
  
在devtool中配置，有四种不同的选项：  
* source-map：完整文件，但会减慢打包速度  
* cheap-module-source-map：不带映射的map，只能找到代码行  
* eval-source-map：eval打包源文件模块，同一个文件中生成，不影响构建速度，可生成完整map，开发阶段使用，生产阶段不能使用  
* cheap-module-eval-source-map：速度最快，大型项目要求较高时可用  

## 本地服务器  
* 浏览器监听代码修改，可自动刷新得到结果  
* webpack提供的本地dev-server  

首先安装：`npm install --save-dev webpack-dev-server`  
devserver中的配置项：  
* contentBase：为该目录的文件提供本地服务器  
* port：默认监听端口  
* inline：设置为true时，文件改变可自动刷新页面  
* historyApiFallback：设置为true则跳转都指向index.html  

可以在package.json中添加命令，开启本地服务器：  
```json  
"scripts":{  
    "server": "npm webpack-dev-server"  
}  
```  
注：这里可能会提示错误，若提示错误，一般是webpack-cli版本问题，首先卸载webpack-cli，然后安装`npm install --save-dev webpack webpack-cli@3.3.12`，再运行命令  

## Loaders  
* 通过loader调用外部脚本或工具，处理不同格式文件，如scss转换为css，es6转换为es5  

**loaders配置项**  
* test：一个匹配loaders所要处理文件的扩展名的正则表达式（必须）  
* loader：loader的名称（必须）  
* include/exclude：手动添加文件、文件夹或者屏蔽文件、文件夹  
* query：loaders额外设置选项  

## Babel  
* 编译Javascript，ES6转换为ES5代码  
* 也可以将JSX转化为js文件  
* 注：babel采用了新的命名空间@babel，而且如果安装了不同版本的babel，要先卸载一个  

* 首先安装babel一些核心功能包，如`@babel/preset-env`——解析ES6，`@babel/preset-react`——解析JSX  
* npm一次性安装多个依赖模块，模块之间用空格隔开：`npm install --save-dev babel-loader @babel/core @babel/preset-env @babel/preset-react`  
* 然后在.babelrc文件中或webpack.config.js文件中，将原来的env替换为`@babel/preset-env`  

**webpack配置babel**  
```js  
module.exports = {  
    entry: __dirname + "/app/main.js",//已多次提及的唯一入口文件  
    output: {  
        path: __dirname + "/public",//打包后的文件存放的地方  
        filename: "bundle.js"//打包后输出文件的文件名  
    },  
    devtool: 'eval-source-map',  
    devServer: {  
        contentBase: "./public",//本地服务器所加载的页面所在的目录  
        historyApiFallback: true,//不跳转  
        inline: true//实时刷新  
    },  
    module: {  
        rules: [  
            {  
                test: /(\.jsx|\.js)$/,  
                use: {  
                    loader: "babel-loader",  
                    options: {  
                        presets: [  
                            "@babel/preset-env", "@babel/preset-react"  
                        ]  
                    }  
                },  
                exclude: /node_modules/  
            }  
        ]  
    }  
};  
```  

**Babel的配置 —— .babelrc文件**  
* webpack会自动调用.babelrc里的配置选项  
```js  
// 改为  
module:{  
    rules:[  
        {  
            test: /(/.jsx|\.js)$/,  
            use:{  
                loader: "babel-loader"  // 保留loader即可  
            },  
            exclude: /node_modules/  
        }  
    ]  
}  
```  
.babelrc文件：  
```json  
{  
    "presets": ["@babel/preset-env", "@babel/preset-react"]  
}  
```  

## CSS模块配置  
* css-loader：让你可以使用@import和url(...)的方法实现require()的功能  
* style-loader：将计算后的样式加入到页面中  
安装后配置：  
```js  
{  
    test: /\.css$/,  
    use: [  
        {  
            loader: "style-loader"  
        }, {  
            loader: "css-loader"  
        }  
    ]  
}  
```  
注意，这里对同一个文件引入了多个loader方法  

### CSS Module  
* 样式表通常巨大且充满全局类名，维护和修改都比较困难  
* 通过css module，所有类命、动画名默认只作用于当前模块  
* css-loader中配置，将css类命传递到组件的代码中  
* 配置中指定CSS类名格式可以使类名唯一化，不会重复  
```js  
{  
    test: /\.css$/,  
    use:[  
        {  
            loader: "style-loader"  
        },  
        {  
            loader: "css-loader",  
            options: {  
                modules: true, // 启动css modules  
                localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css类名格式  
            }  
        }  
    ]  
}  
```  

### CSS预处理器  
在webpack中配置loaders即可使用：  
* less-loader  
* sass-loader  
* stylus-loader  

**PostCSS使用**  
* 为CSS代码自动添加适应不同浏览器的CSS前缀  
* autoprefixer为自动添加前缀的插件  


* 首先安装：`npm install --save-dev postcss-loader autoprefixer`  
* 配置好postcss-loader后，在根目录创建post.config.js，添加如下代码，重新打包后，css就会自动根据Can i use（前端兼容性检查工具）里的数据添加不同前缀了。  
```js  
// postcss.config.js  
module.exports = {  
    plugins:[  
        require('autoprefixer')  
    ]  
}  
```  

## Plugins  
* 用来扩展Webpack功能，在整个构建过程中生效，执行相关任务  
* Loader用于在打包过程中处理源文件，依次处理一个，插件并不直接操作单个文件，而是对整个构建过程起作用  

### 使用插件的方法  
* 首先通过npm安装，然后在webpack配置文件中引入  
* 然后在plugins中添加该插件的一个实例，plugins是一个数组  
```js  
// webpack.config.js  
const webpack = require('webpack')  // 引入插件  

module.exports = {  
    ...  
    plugins:[  
        new webpack.BannerPlugin('版权所有')  
    ]  
}  
```  

### 常用插件  
**HTMLWebpackPlugin**  
* 依据一个简单的index.html模板，生成一个自动引用打包后的js文件的index.html  
* 当每次生成的js文件名不同时非常有用（比如添加了hash值）  

使用：  
* 首先安装插件：`npm i html-webpack-plugin -D`  
* 然后移除public文件夹，因为index.html会自动生成，而css已经在前面打包到js中了  
* app目录下，创建一个index.tmp.html模板，包含title等必须元素，编译过程中，插件会根据此模板生成最终的html页面，会自动添加依赖的css、js、favicon等文件  
* 注意，这时候css module会报错，先去除  

**Hot Module Replacement**  
* 热更新，修改组件代码后，自动刷新显示修改后的效果  
* 注意，现在webpack自带HRM插件，不用手动安装  
* 直接在dev-server中添加hot参数，然后在插件中添加实例，即可实现局部刷新  
* js代码热更新还需要单独再配置，css热更新由css-loader自动配置  
```js  
devServer:{  
        ...  
        hot: true  // 热更新（局部组件更新）  
}  

plugins:[  
        ...  
        new webpack.HotModuleReplacementPlugin()  
    ]  
```  



**Babel和Webpack**  
* Babel和webpack是独立的工具  
* 二者可以一起工作，都可以通过插件拓展功能  
* HMR是一个webpack插件，它让你能浏览器中实时观察模块修改后的效果，但是如果你想让它工作，需要对模块进行额外的配置  


## 产品构建  
* 优化和压缩代码，实现缓存，并分离css和js等  
* 将webpack配置文件分解，新建webpack.prod.config.js  
* 在package.json文件中script新增build命令，用以实现生产环境打包  
```json  
"scripts": {  
    "test": "echo \"Error: no test specified\" && exit 1",  
    "start": "npx webpack",  
    "server": "npx webpack-dev-server",  
    "build": "webpack --config webpack.prod.config.js"  
  },  
```  
* 注意，在生产环境中可以去除一些不必要的代码  
* 如dev-server、热更新，然后在plugins中配置：  
```js  
plugins:[  
        new HtmlWebpackPlugin({  
            // new 一个插件实例并传入相关参数  
            template: __dirname + "/app/index.tmp.html"  
        }),  
        new webpack.DefinePlugin({  
            'process.env.NODE_ENV': JSON.stringify('production')  
        }),  
        new UglifyJsPlugin(),  
        new CssExtractPlugin()  
    ]  
```  
注意上面的写法，不能不同，否则出错  

### 实现优化的插件  
* OccurrenceOrderPlugin：为组件分配ID，令webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID（注意：已经默认启用，不用设置）  
* UglifyJsPlugin：压缩js代码（需安装）  
* MiniCssExtractPlugin：分离CSS和JS文件（需安装,webpack4以上使用）  

运行npm run build即可看到压缩后的代码bundle.js  

### 缓存  
* 保证文件名和文件内容匹配（内容改变，文件名改变）  
* webpack可以把一个哈希值添加到打包的文件名中，用以确定文件是否改变，从而使用缓存，提高打包新能  
* 即在filename中添加一个哈希值即可  
```js  
output:{  
        path: __dirname + "/build", // 打包文件输出位置  
        filename: "bundle-[hash].js"  // 添加hash值  
    },  
```  
添加hash后，文件内容改变时重新打包，则会生产不同的文件，导致文件越来越多，这时候可以用一个插件clean-webpack-plugin进行清理：  
* 构建时它会把 build或dist (就是放生产环境用的文件) 目录里的文件先清除干净  
* 安装：`npm i clean-webpack-plugin -D`  
* 引入和配置：  
```js  
// 注意，该插件新版引入要使用解构  
const { CleanWebpackPlugin } = require('clean-webpack-plugin')  

new CleanWebpackPlugin()  
```  

## 性能警告  
webpack会给出各种性能警告，为了过滤一些不重要的警告，可以配置performance选项：  
```js  
//该选项可以控制 webpack 如何通知「资源(asset)和入口起点超过指定文件限制」  
performance: {  
    hints: "warning", // 枚举  
    hints: "error", // 性能提示中抛出错误  
    hints: false, // 关闭性能提示  
    maxAssetSize: 200000, // 整数类型（以字节为单位）  
    maxEntrypointSize: 400000, // 整数类型（以字节为单位）  
    assetFilter: function(assetFilename) {  
        // 提供资源文件名的断言函数，如以下只给出css和js文件的警告  
        return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');  
    }  
},  
```  

遗留问题：引入css module报错  

## 完整webpack.prod.config.js  
```js  
const HtmlWebpackPlugin = require('html-webpack-plugin')  
const  webpack  = require('webpack')  
const CssExtractPlugin = require('mini-css-extract-plugin')  
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')  
const { CleanWebpackPlugin } = require('clean-webpack-plugin')  

module.exports = {  
    devtool: 'eval-source-map',  
    // __dirname为node.js的一个全局变量，指向当前指向脚本所在的目录  
    entry: __dirname + "/app/main.js", // 唯一入口文件  
    output:{  
        path: __dirname + "/build", // 打包文件输出位置  
        filename: "bundle-[hash].js"  
    },  
    mode: 'production',  

    //该选项可以控制 webpack 如何通知「资源(asset)和入口起点超过指定文件限制」  
	 performance: {  
	    hints: "warning", // 枚举  
	    hints: "error", // 性能提示中抛出错误  
	    hints: false, // 关闭性能提示  
	    maxAssetSize: 200000, // 整数类型（以字节为单位）  
	    maxEntrypointSize: 400000, // 整数类型（以字节为单位）  
	    assetFilter: function(assetFilename) {  
	      // 提供资源文件名的断言函数，如以下只给出css和js文件的警告  
	      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');  
	    }  
	  },  

    module:{  
        rules:[  
            {  
                test: /(\.jsx|\.js)$/,  
                use:{  
                    loader: "babel-loader",  
                },  
                exclude: /node_modules/  
            },  
            {  
                test: /\.css$/,  
                use: [  
                    // 注意顺序，style-loader要在前面，否则报错  
                    {  
                        loader: "style-loader"  
                    },  
                    {  
                        loader: "css-loader",  
                        options: {  
                            modules: true, // 启动css modules  
                            // localIdentName: '[name]__[local]--[hash:base64:5]' // 遗留问题，报错  
                        }  
                    },  
                    
                    {  
                        loader: "postcss-loader"  
                    }  
                ]  
            }  
        ]  
    },  
    plugins:[  
        new HtmlWebpackPlugin({  
            // new 一个插件实例并传入相关参数  
            template: __dirname + "/app/index.tmp.html"  
        }),  
        new webpack.DefinePlugin({  
            'process.env.NODE_ENV': JSON.stringify('production')  
        }),  
        new UglifyJsPlugin(),  
        new CssExtractPlugin(),  
        new CleanWebpackPlugin()  
    ]  

}  
```  

