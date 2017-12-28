let E = window.textEditor
let editor = new E('#editorContainer')
editor.customConfig.menus = [
    'head',  // 标题
    'bold',  // 粗体
    'italic',  // 斜体
    'underline',  // 下划线
    'strikeThrough',  // 删除线
    'foreColor',  // 文字颜色
    'backColor',  // 背景颜色
/*     'link',  // 插入链接
    'list',  // 列表 */
    'justify',  // 对齐方式
/*     'quote',  // 引用
    'emoticon',  // 表情 
    'image',  // 插入图片*/
    'table',  // 表格
/*     'video',  // 插入视频
    'code',  // 插入代码 */
    'html',  // html导入导出
    'undo',  // 撤销
    'redo'  // 重复
]
editor.create()

