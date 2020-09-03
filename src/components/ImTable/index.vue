<template>
  <el-table
    :data="data"
    style="width: 100%"
    border
  >
    <el-table-column
      v-if="index"
      type="index"
      width="48"
      fixed
      align="center"
    >
      <template slot="header">
        <i class="el-icon-menu" />
      </template>
    </el-table-column>
    <slot />
  </el-table>
</template>
<script>
export default {
  name: 'ImTable',
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    index: {
      type: Boolean,
      default: false
    }
  }
}
</script>
