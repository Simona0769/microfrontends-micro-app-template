/**
 * ImSearchPad
 * @module components
 * @desc 搜索区
 * @author Mo Xiaomeng
 * @date 2020/03/13
 * @param {Object} [model] - 表单数据对象
 * @param {Boolean} [isExpand] - 是否显示更多， 默认为 false
 * @example 调用示例
 * <im-search-pad :model="searchForm" :is-expand.sync="isExpand" @search="handleSearch" @reset="handleReset">
    <im-search-pad-item prop="user">
      <el-input v-model="searchForm.user" placeholder="审批人" />
    </im-search-pad-item>
    <im-search-pad-item prop="region">
      <el-select v-model="searchForm.region" placeholder="活动区域">
        <el-option label="区域一" value="shanghai" />
        <el-option label="区域二" value="beijing" />
      </el-select>
    </im-search-pad-item>
    <im-search-pad-item prop="user" v-show="isExpand">
      <el-input v-model="searchForm.user" placeholder="审批人2" />
    </im-search-pad-item>
  </im-search-pad>
 */
import imSearchPad from './index.vue'

const ImSearchPad = {
  install: function(Vue) {
    Vue.component('imSearchPad', imSearchPad)
  }
}

export default ImSearchPad
