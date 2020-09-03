<template>
  <div class="smp-card">
    <div class="smpc-hd">
      <span class="smpch-l">{{cardname}}</span>
      <el-button @click="btnClick" v-if="btnname" class="smpch-r" type="text">{{btnname}}</el-button>
    </div>
    <div class="smpc-bd">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardname: {
      type: String,
      default: '卡片名称'
    },
    btnname: {
      type: String,
      default: ''
    }
  },
  data () {
    return {

    }
  },
  methods: {
    btnClick () {
      this.$eimt('btnClick')
    }
  }
}
</script>

<style lang="scss">
.smp-card{

}
</style>
