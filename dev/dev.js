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
    'justify',  // 对齐方式
    'table',  // 表格
    'html',  // html导入导出
    'undo',  // 撤销
    'redo'  // 重复
]

editor.create()

