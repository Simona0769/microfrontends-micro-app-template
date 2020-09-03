/**
 * ImToolBar
 * @module components
 * @desc 列表表头的按钮工具栏
 * @author Mo Xiaomeng
 * @date 2020/03/14
 * @example 调用示例
 * <im-tool-bar>
     <div slot="left">
      <el-button size="mini" type="primary"> 新增通告 </el-button>
     </div>
     <div slot="right">
      <el-button size="mini"> 删除 </el-button>
     </div>
   </im-tool-bar>
 */
import imToolBar from './index.vue'

const ImToolBar = {
  install: function(Vue) {
    Vue.component('ImToolBar', imToolBar)
  }
}

export default ImToolBar
