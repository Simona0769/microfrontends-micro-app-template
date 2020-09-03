<template>
  <div class="im-pagination">
    <div class="main-info">
      共{{ total }}条记录 第 {{ currentPage < 1 ? 1:currentPage }} / {{ total === 0 ? 1: Math.ceil(total/limit) }} 页
    </div>
    <div>
      <el-pagination
        background
        :current-page.sync="page"
        :page-size.sync="limit"
        :page-sizes="pageSizes"
        layout="prev, pager, next, sizes, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import defaultSettings from '@/settings'
export default {
  name: 'ImPagination',
  props: {
    pageSize: {
      type: Number,
      default: defaultSettings.pageSize
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 40, 50, 100]
      }
    },
    currentPage: {
      type: Number,
      default: 1
    },
    total: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
    }
  },
  computed: {
    page: {
      get() {
        return this.currentPage
      },
      set(val) {
        this.$emit('update:currentPage', val)
      }
    },
    limit: {
      get() {
        return this.pageSize
      },
      set(val) {
        this.$emit('update:pageSize', val)
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      //   this.limit = val
      this.$emit('pagination', { page: this.currentPage, pageSize: val })
    },
    handleCurrentChange(val) {
      this.$emit('pagination', { page: val, pageSize: this.limit })
    }
  }
}
</script>
<style lang="scss">
@import '~@/styles/variables';
.im-pagination {
    display: flex;
    justify-content: space-between;
    font-size: 14px !important;
    color: $tableTextColor;
    .main-info {
        font-size: 13px;
        line-height: 32px;
    }
    .el-input_inner {
        height: 24px;
    }
    .el-pager li {
        height: 24px;
    }
    .el-pagination.is-background .btn-prev, .el-pagination.is-background .btn-next, .el-pagination.is-background .el-pager li {
        background-color: transparent;
        min-width: 24px;
        height: 24px;
        line-height: 24px;
        margin: 2px;
    }
    .el-pagination__jump {
        margin-left: 11px;
    }
    >>> .el-input__inner {
        height: 24px !important;
    }
}
</style>
