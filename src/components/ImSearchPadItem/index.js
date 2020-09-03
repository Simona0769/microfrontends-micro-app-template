/**
 * ImSearchPadItem
 * @module components
 * @desc 搜索区条目, 用来规范样式
 * @author Mo Xiaomeng
 * @date 2020/03/13
 * * @param {String} [prop] - 表单域 model字段，该属性必填
 * @example 调用示例
 *  <im-search-pad-item prop="user">
      <el-input v-model="searchForm.user" placeholder="审批人" />
    </im-search-pad-item>
 */
import imSearchPadItem from './index.vue'

const ImSearchPadItem = {
  install: function(Vue) {
    Vue.component('ImSearchPadItem', imSearchPadItem)
  }
}

export default ImSearchPadItem
