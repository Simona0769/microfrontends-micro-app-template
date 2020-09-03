<template>
  <div class="im-tool-bar">
    <div class="im-tool-bar__item">
      <slot name="left" />
    </div>
    <div class="im-tool-bar__item">
      <slot name="right" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'ImToolBar'
}
</script>
<style lang="scss">
.im-tool-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 21px;
}
</style>
