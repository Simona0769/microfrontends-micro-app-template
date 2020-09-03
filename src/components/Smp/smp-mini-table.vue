<template>
  <el-table
    :data="tableData"
    class="smp-mini-table"
    style="width: 100%"
    size="mini"
    >
    <el-table-column
      v-for="(item,index) in tableType"
      :key="index"
      :prop="item.prop"
      :label="item.label"
      :width="item.width||''">
    </el-table-column>
  </el-table>
</template>

<script>
// props:
// list_data{
//   type
//   title
//   time
// }
// titleName:['type','title','time']
export default {
  props: {
    tableData: {
      type: Array,
      default () {
        return []
      }
    },
    tableType: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      // tableData: [{
      //   date: '2016-05-02',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1518 弄'
      // }, {
      //   date: '2016-05-04',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1517 弄'
      // }, {
      //   date: '2016-05-01',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1519 弄'
      // }, {
      //   date: '2016-05-03',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1516 弄'
      // }]
    }
  },
  methods: {

  }
}
</script>

<style lang="scss">
.smp-table{
  // padding: 0!important;
}
</style>
