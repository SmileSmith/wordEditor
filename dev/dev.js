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

const result = document.getElementById('result')
const getButton = document.getElementById('getContent')
getButton.onclick = () => {
    fetch('/upload-html', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: protocol_html, fileName: 'result' })
    })
        .then(response => {
            return response.json()
        })
        .then(json => {
            if (json.code === 200) {
                result.textContent = '成功'
            } else {
                result.textContent = '失败'
            }
            setTimeout(() => {
                result.textContent = ''
            }, 1000)
        })
}
