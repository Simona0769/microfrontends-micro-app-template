/**
 * ImPagination
 * @module components
 * @desc 通用分页组件
 * @author Mo Xiaomeng
 * @date 2020/03/14
 * * @param {number} [page-size] - 每页显示条目个数，支持 .sync 修饰符
 * * @param {number[]} [page-sizes] - 每页显示个数选择器的选项设置
 * * @param {number} [current-page] - 当前页数，支持 .sync 修饰符
 * * @param {number} [total] - 总条目数, 必填
 * @example 调用示例
 *  <im-search-pad-item prop="user">
      <el-input v-model="searchForm.user" placeholder="审批人" />
    </im-search-pad-item>
 */
import imPagination from './index.vue'

const ImPagination = {
  install: function(Vue) {
    Vue.component('ImPagination', imPagination)
  }
}

export default ImPagination
