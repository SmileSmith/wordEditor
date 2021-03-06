
# textEditor

## 一、介绍

**textEditor** —— 过滤word转html后的无用代码，可编辑，转换出结构简单无副作用的html文档。

基于wangEditor扩展，相关文档请访问 [https://github.com/wangfupeng1988/wangEditor](https://github.com/wangfupeng1988/wangEditor)

## 二、请访问 DEMO

**GITHUB托管** —— [https://smilesmith.github.io/wordEditor/](https://smilesmith.github.io/wordEditor/)

## 三、使用方法

### 1、利用word导出Html

    1) 先使用office word，打开word版本文件，选择另存为

    2) 在保存的弹窗中，保存类型选择为 [过滤的网页(html/ html)]

    3) 在保存的弹窗中，点击工具，选择 [ WEB选项 ]

    4) 在弹出的WEB选项弹窗中，点击浏览器，去除：利用CSS设置字体样式、利用VML显示图形

    5) 在弹出的WEB选项弹窗中，点击编码，选择：UTF-8

    6) 点击确定，点击保存

    7) 弹窗警告：确认是否过滤，选择是

### 2、用Editor转换成标准html，编辑和导出

- 得到word转换后的html

- 在本网页中点击`HTML`，选择前面得到的html文件，导入html

- 编辑文件，添加参数锚点：例如{$userName}

- 点击`HTML`，修改标题，点击导出，浏览器自动下载html



## 四、本地调试运行

- 下载源码 `git clone git@github.com:SmileSmith/wordEditor.git`
- 安装或者升级最新版本 node（最低`v7.10.X`）
- 进入目录，安装依赖包 `cd textEditor && npm i`
- 安装包完成之后，运行`npm start`
- 打开浏览器访问[localhost:4000/](http://localhost:4000/)


## 五、在其他项目中使用

```javascript
var E = window.textEditor
var editor = new E('#div1')
editor.create()
```
