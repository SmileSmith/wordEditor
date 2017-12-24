/*
    menu - img
*/
import $ from '../../util/dom-core.js'
import { getRandom, arrForEach } from '../../util/util.js'
import Panel from '../panel.js'

// 构造函数
function Html(editor) {
    this.editor = editor
    this.$elem = $('<div class="w-e-menu"><i class="w-e-icon-html"><i/></div>')
    this.type = 'panel'

    // 当前是否 active 状态
    this._active = false
}

// 原型
Html.prototype = {
    constructor: Image,

    onClick: function () {
        const editor = this.editor
        const config = editor.config
        if (config.qiniu) {
            return
        }
        if (this._active) {
            this._createEditPanel()
        } else {
            this._createInsertPanel()
        }
    },

    _createEditPanel: function () {
        const editor = this.editor
        const uploadHtml = editor.uploadHtml

        // id
        const delBtn = getRandom('del-btn')
        const exportBtn = getRandom('export-btn')
        const htmlTitleInput = getRandom('html-title-input')

        // tab 配置
        const tabsConfig = [
            {
                title: '删除 && 导出协议',
                tpl: `<div>
                    <div class="w-e-input-container"><label>协议标题：</label><input id="${htmlTitleInput}" value="${this._htmlTitle || ''}"/></div>
                    <div class="w-e-button-container">
                        <button id="${exportBtn}" class="gray left">导出HTML版本协议</button>
                        <button id="${delBtn}" class="red left">清空Html协议</button>
                    </dv>
                </div>`,
                events: [
                    {
                        selector: '#' + delBtn,
                        type: 'click',
                        fn: () => {
                            uploadHtml.clearHtml()
                            editor._insertedHtml = false
                            editor.menus.changeActive()
                            // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                            return true
                        }
                    },
                    {
                        selector: '#' + exportBtn,
                        type: 'click',
                        fn: () => {
                            uploadHtml.exportHtml(editor.txt.html(), this._htmlTitle)
                            // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                            return true
                        }
                    },
                    {
                        selector: '#' + htmlTitleInput,
                        type: 'input',
                        fn: (e) => {
                            this._htmlTitle = e.target.value
                            // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                            return false
                        }
                    }
                ]
            }
        ]

        // 创建 panel 并显示
        const panel = new Panel(this, {
            width: 300,
            tabs: tabsConfig
        })
        panel.show()

        // 记录属性
        this.panel = panel
    },

    _createInsertPanel: function () {
        const editor = this.editor
        const uploadHtml = editor.uploadHtml
        const config = editor.config

        // id
        const upTriggerId = getRandom('up-trigger')
        const upFileId = getRandom('up-file')

        // tabs 的配置
        const tabsConfig = [
            {
                title: '上传协议',
                tpl: `<div class="w-e-up-img-container">
                    <div id="${upTriggerId}" class="w-e-up-btn">
                        <i class="w-e-icon-upload2"></i>
                    </div>
                    <div style="display:none;">
                        <input id="${upFileId}" type="file" accept="text/html"/>
                    </div>
                </div>`,
                events: [
                    {
                        // 触发选择文件
                        selector: '#' + upTriggerId,
                        type: 'click',
                        fn: () => {
                            const $file = $('#' + upFileId)
                            const fileElem = $file[0]
                            if (fileElem) {
                                fileElem.click()
                            } else {
                                // 返回 true 可关闭 panel
                                return true
                            }
                        }
                    },
                    {
                        // 选择图片完毕
                        selector: '#' + upFileId,
                        type: 'change',
                        fn: () => {
                            const $file = $('#' + upFileId)
                            const fileElem = $file[0]
                            if (!fileElem) {
                                // 返回 true 可关闭 panel
                                return true
                            }

                            // 获取选中的 file 对象列表
                            const fileList = fileElem.files
                            if (fileList.length) {
                                this._htmlTitle = uploadHtml.uploadHtml(fileList[0])
                            }
                            editor._insertedHtml = true
                            editor.menus.changeActive()
                            // 返回 true 可关闭 panel
                            return true
                        }
                    }
                ]
            },
        ] // tabs end

        // 创建 panel 并显示
        const panel = new Panel(this, {
            width: 400,
            tabs: tabsConfig
        })
        panel.show()

        // 记录属性
        this.panel = panel
    },

    // 试图改变 active 状态
    tryChangeActive: function (e) {
        const editor = this.editor
        const $elem = this.$elem
        if (editor._insertedHtml) {
            this._active = true
            $elem.addClass('w-e-active')
        } else {
            this._active = false
            $elem.removeClass('w-e-active')
        }
    }
}

export default Html