/**
 * ImTable
 * @module components
 * @desc table + 分页
 * @author Chen Runrong
 * @date 2020/03/17
 * * @param {Array} [data] - 表格数据，支持 .sync 修饰符
 * * @param {Boolean} [index] - 是否显示左侧的序号（带默认样式）
 * * @param {String} [remoteMethod] - 远程api接口方法名
 * @example 调用示例
 *    <im-table-page
        :data.sync="tableData"
        index
        remote-method="orgEmployeeInf/pageEmployee"
      >
        <el-table-column label="员工账号" prop="userMobile" />
        <el-table-column label="员工联系号码" prop="employeeTel" />
        <el-table-column label="角色" prop="roleNms" />
        <el-table-column label="员工创建时间" prop="employeeCreateTime" width="198px" />
      </im-table-page>

       methods: {
        rowClassName({ row, rowIndex }) {
          if (rowIndex === 3 || rowIndex === 4) {
            return 'disabled-row'
          }
          return ''
        }
      }
 */
import imTablePage from './index.vue'
const ImTablePage = {
  install: function(Vue) {
    Vue.component('ImTablePage', imTablePage)
  }
}

export default ImTablePage
