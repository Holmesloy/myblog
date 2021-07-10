# VSCode开发环境配置

vscode所有的设置都在其中的setting.json文件中，
快捷键：Ctrl + Shift + p，打开命令面板，输入setting搜索进入。

## ESlint
* 在vscode中安装ESLint插件
* 项目中设置
* 项目中创建.eslintrc.js配置文件或直接在setting文件中设置添加以下代码
```json
"eslint.validate": [
    "javascriptreact",
    "html",
    {"language": "javascript","autoFix": true},
    {"language": "vue","autoFix": true}
 ]
// 错误保存自动fix
"editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.fixAll.eslint": true
}

```
