<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  /* min-height: calc(100vh - 50px);*/
  /*height: calc(100vh - 50px);*/
  height: 100vh;
  box-sizing: border-box;
  width: 100%;
  position: relative;
  overflow: scroll;
  background-color: #efefef;
}
.fixed-header+.app-main {
  padding-top: 40px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
