<template>
  <div class="smp-page-right" :class="{'close':isPageClose}">
    <div class="smp-pl-box">
      <slot></slot>
    </div>
    <div class="smp-pl-controler" :class="{'close':isPageClose}" @click="closePage"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isPageClose: false
    }
  },
  methods: {
    closePage () {
      this.isPageClose = !this.isPageClose
    }
  }
}
</script>

<style lang="scss">
.smp-page-right{
  // padding: 0!important;
}
</style>
