/*
    上传图片
*/

import { arrForEach, getNowFormatDate } from '../../util/util.js'
import Progress from './progress.js'
import { UA } from '../../util/util.js'

// 构造函数
function UploadHtml(editor) {
    this.editor = editor
}

// 原型
UploadHtml.prototype = {
    constructor: UploadHtml,

    // 根据 debug 弹出不同的信息
    _alert: function(alertInfo, debugInfo) {
        const editor = this.editor
        const debug = editor.config.debug
        const customAlert = editor.config.customAlert

        if (debug) {
            throw new Error('textEditor: ' + (debugInfo || alertInfo))
        } else {
            if (customAlert && typeof customAlert === 'function') {
                customAlert(alertInfo)
            } else {
                alert(alertInfo)
            }
        }
    },

    // 根据链接插入图片
    insertHtml: function(content) {
        if (!content) {
            return
        }

        const editor = this.editor
        const config = editor.config

        editor.txt.html(this.filterHtml(content))
    },
    // 过滤html中的无用样式
    filterHtml: function(content) {
        let str = content
        const editor = this.editor
        const config = editor.config
        const htmlFilterRules = config.htmlFilterRules
        const htmlReplaceRules = config.htmlReplaceRules
        arrForEach(htmlFilterRules, (rule) => {
            str = str.replace(rule, '')
        })
        arrForEach(htmlReplaceRules, (rule) => {
            str = str.replace(rule.origin, rule.replace)
        })
        return str
    },

    // 上传协议
    uploadHtml: function(file) {

        // ------------------------------ 获取配置信息 ------------------------------
        const editor = this.editor
        const config = editor.config

        const maxSize = config.uploadImgMaxSize
        const maxSizeM = maxSize / 1000 / 1000
        const uploadFileName = config.uploadFileName || ''
        const hooks = config.uploadImgHooks || {}

        // ------------------------------ 验证文件信息 ------------------------------
        let errInfo = []
        const name = file.name
        const size = file.size

        if (/\.(html|htm)$/i.test(name) === false) {
            // 后缀名不合法，不是Html
            errInfo.push(`【${name}】不是Html`)
        }
        if (maxSize < size) {
            // 上传Html过大
            errInfo.push(`【${name}】大于 ${maxSizeM}M`)
        }

        // 抛出验证信息
        if (errInfo.length) {
            this._alert('Html验证未通过: \n' + errInfo.join('\n'))
            return
        }

        // ------------------------------ 读取文件内容 ------------------------------
        const reader = new FileReader()
        reader.onload = e => {
            var content = e.target.result
            this.insertHtml(content)
        }
        reader.readAsText(file)

        // ------------------------------ 默认标题 ------------------------------
        return name.replace(/\.(html|htm)$/i, '')
    },
    // 清空html
    clearHtml: function() {
        const editor = this.editor
        editor.txt.clear()
    },
    // 导出Html
    exportHtml: function(content, title) {
        const editor = this.editor
        const config = editor.config
        var aLink = document.createElement('a')
        var blob = new Blob([config.htmlWrapper(content, title)])
        aLink.download = `protocol-${getNowFormatDate()}.html`
        aLink.href = URL.createObjectURL(blob)
        aLink.click()
        this._alert('浏览器开始下载...')
    }
}

export default UploadHtml
