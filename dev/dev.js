let E = window.textEditor
let editor = new E('#editorContainer')
let protocol_html = ''
// 使用 onchange 函数监听内容的变化，并实时更新到 state 中
editor.customConfig.onchange = html => {
    protocol_html = html
}
editor.create()
const setButton = document.getElementById('setContent')
setButton.onclick = () => {
    fetch('/protocol/protocol.html', { mode: 'cors', method: 'GET' })
        .then(response => {
            return response.text()
        })
        .then(text => {
            editor.txt.html(text)
            editor.change()
        })
}
