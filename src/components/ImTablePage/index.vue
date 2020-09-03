<template>
  <div class="im-table-page">
    <!-- table -->
    <el-table
      ref="table"
      v-loading="loading"
      :border="border"
      :data="data"
      v-bind="$attrs"
      :row-class-name="rowClassName"
      :tree-props="treeProps"
      :default-expand-all="defaultExpandAll"
      :span-method="spanMethod"
      :row-key="rowKey"
      @selection-change="moreCheckBox"
      @select-all="selectAll"
      @select="select"
    >
      <el-table-column v-if="index" type="index" width="48" fixed align="center">
        <template slot="header">
          <i class="el-icon-menu" />
        </template>
      </el-table-column>
      <slot />
    </el-table>
    <im-pagination

      class="table-page"
      :total="total"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      @pagination="handlePagination"
    />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    data: {
      type: Array,
      required: true
    },
    index: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    // table 查询的远程方法
    remoteMethod: {
      type: Function, // function(queryParam), queryParam 查询条件
      default: () => {}
    },
    rowClassName: {
      type: Function,
      default: () => {}
    },
    // 合并行或列的方法
    spanMethod: {
      type: Function,
      default: () => {}
    },
    // 多选方法
    moreCheckBox: {
      type: Function,
      default: () => {}
    },
    selectAll: {
      type: Function,
      default: () => {}
    },
    select: {
      type: Function,
      default: () => {}
    },
    treeProps: {
      type: Object,
      default: function() {
        return {}
      }
    },
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    rowKey: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      total: 0,
      pageSize: 10,
      currentPage: 0,
      condition: {} // 查询条件参数
    }
  },
  mounted() {
    this.currentPage = 0
    window.addEventListener('resize', this.doLayout)
    this.updateData()
  },
  activated() {
    this.$refs.table.doLayout()
  },
  destroyed() {
    window.removeEventListener('resize', this.doLayout)
  },
  methods: {
    doRefresh(pageParam) {
      if (pageParam && pageParam instanceof Object) {
        this.currentPage = pageParam.currentPage
        this.pageSize = pageParam.pageSize
      }
      this.updateData()
    },
    updateData() {
      this.loading = true
      const pageNum = this.currentPage < 1 ? 1 : this.currentPage
      return this.remoteMethod({
        pageNum,
        pageSize: this.pageSize
      }).then(response => {
        const { data } = response
        if (data && data.records) {
          this.$emit('update:data', data.records)
          this.total = data.total
          this.$emit('updated', data.records)
        }
        this.loading = false
      }).catch(() => {
        this.$emit('update:data', [])
        this.loading = false
      })
    },
    handlePagination(data) {
      this.currentPage = Math.min(this.currentPage, Math.ceil(this.total / data.pageSize))
      this.updateData()
    },
    doLayout() {
      this.$refs.table && this.$refs.table.doLayout()
    },
    toggleRowSelection(row, selected) {
      this.$refs.table.toggleRowSelection(row, selected)
    },
    clearSelection() {
      this.$refs.table.clearSelection()
    },
    toggleRowExpansion(row, expanded) {
      this.$refs.table.toggleRowExpansion(row, expanded)
    }
  }
}
</script>
<style scoped lang="scss">
@import '~@/styles/variables';
.im-table-page {
  .table-page {
    margin-top: 15px;
  }
  .im-pagination {
    padding-top: 16px;
    border-top: $tableBorder;
  }
}
</style>
