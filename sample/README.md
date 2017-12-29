# word-editor-website

word-to-html简易编辑器，基于[https://github.com/SmileSmith/word-editor-website/](https://github.com/SmileSmith/word-editor-website/), 托管到github.io。

## 用法

### 利用word导出Html

    1、先使用office word，打开word版本文件，选择另存为

    2、在保存的弹窗中，保存类型选择为 [ 过滤的网页(html/ html) ]

    3、在保存的弹窗中，点击工具，选择 [ WEB选项 ]

    4、在弹出的WEB选项弹窗中，点击浏览器，去除：利用CSS设置字体样式、利用VML显示图形

    4、在弹出的WEB选项弹窗中，点击编码，选择：UTF-8

    6、点击确定，点击保存

    7、弹窗警告：确认是否过滤，选择是

### 用Editor转换成标准html，编辑和导出

- 得到word转换后的html

- 在本网页中点击`HTML`，选择前面得到的html文件，导入html

- 编辑文件，添加参数锚点：例如{$userName}

- 点击`HTML`，修改标题，点击导出，浏览器自动下载html
