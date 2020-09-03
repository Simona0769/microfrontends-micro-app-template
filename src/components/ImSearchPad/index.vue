<template>
  <div :class="['im-search-pad', borderBottom ?'border-bottom' :'']">
    <el-form ref="searchForm" :inline="true" :model="model">
      <slot />
      <el-form-item>
        <el-button type="primary" size="mini" @click="onSearch">搜索</el-button>
        <el-button size="mini" @click="onReset">重置</el-button>
        <el-button v-if="hasExpand" size="mini" type="text" @click="onExpand">
          {{ isExpanded? '收起更多' : '展开更多' }}
          <i :class="isExpanded ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" />
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'ImSearchPad',
  props: {
    model: {
      type: Object,
      default: () => {
        return {}
      }
    },
    isExpand: {
      type: Boolean,
      default: false
    },
    hasExpand: {
      type: Boolean,
      default: true
    },
    borderBottom: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isExpanded: this.isExpand
    }
  },
  methods: {
    onSearch() {
      this.$emit('search')
    },
    onReset() {
      this.$refs['searchForm'].resetFields()
      this.$emit('reset')
    },
    onExpand() {
      this.isExpanded = !this.isExpanded
      this.$emit('update:isExpand', this.isExpanded)
    }
  }
}
</script>
<style lang="scss">
@import '~@/styles/variables';
.im-search-pad {
  margin-bottom: 16px;
  background-color: #fff;
  padding: 16px;
  padding-bottom: 0;
  .el-form-item {
    /*margin-bottom: 10px;*/
  }

  &.border-bottom{
    border-bottom: 1px solid #dcdfe6;
  }
}
</style>
