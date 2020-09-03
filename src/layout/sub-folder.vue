<template>
  <div class="app-container">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'SubFoloder'
}
</script>

<style lang="scss" scoped>
  .app-container {
    padding: 0;
    &>div:first-of-type {
      position: relative;
      width: 100%;
      height: 100%;
      padding: 10px;
    }
  }
</style>
