<template>
  <el-form-item class="im-search-pad-item" :prop="prop" :label="label">
    <slot />
  </el-form-item>
</template>
<script>
export default {
  name: 'ImSearchPadItem',
  props: {
    prop: {
      required: true,
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  }
}
</script>
