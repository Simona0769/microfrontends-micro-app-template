/**
 * ImSearchPad
 * @module components
 * @desc table内敛确认提示框
 * @author Chen Runrong
 * @date 2020/04/05
 * @param {Boolean} [visible] - 是否显示 支持sync修饰符
 * @param {String} [title] - 标题
 * @example 调用示例
 *
 */
import imDialog from './index.vue'

const ImDialog = {
  install: function(Vue) {
    Vue.component('ImDialog', imDialog)
  }
}

export default ImDialog
