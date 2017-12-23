/*
    bold-menu
*/
import $ from '../../util/dom-core.js'

// 构造函数
function Bold(editor) {
    this.editor = editor
    this.$elem = $(
        `<div class="w-e-menu">
            <i class="w-e-icon-bold"><i/>
        </div>`
    )
    this.type = 'click'

    // 当前是否 active 状态
    this._active = false
}

// 原型
Bold.prototype = {
    constructor: Bold,

    // 点击事件
    onClick: function (e) {
        // 点击菜单将触发这里
        const editor = this.editor
        const isSeleEmpty = editor.selection.isSelectionEmpty()

        if (isSeleEmpty) {
            // 选区是空的，插入并选中一个“空白”
            // editor.selection.createEmptyRange()
            // chenlongde 为空不需要操作，避免空标签
            return
        }

        // 执行 bold 命令
        editor.cmd.do('bold')

        if (isSeleEmpty) {
            // 需要将选取折叠起来
            editor.selection.collapseRange()
            editor.selection.restoreSelection()
        }
        // chenlongde 用strong标签替换b
/*         const selectionText = editor.selection.getSelectionText()
        if (this._active) {
            editor.cmd.do('insertHTML', '<span>' + selectionText + '</span>')
        } else {
            editor.cmd.do('insertHTML', '<strong>' + selectionText + '</strong>')
        } */
    },

    // 试图改变 active 状态
    tryChangeActive: function (e) {
        const editor = this.editor
        const $elem = this.$elem
        if (editor.cmd.queryCommandState('bold')) {
            this._active = true
            $elem.addClass('w-e-active')
        } else {
            this._active = false
            $elem.removeClass('w-e-active')
        }
    }
}

export default Bold
