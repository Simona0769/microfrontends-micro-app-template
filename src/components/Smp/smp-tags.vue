<template>
  <div class="smp-tags">
    <span class="smpt-bd">
      <i :class="'smptb-type warn-lv-'+lv"></i>
      <em>{{name}}</em>
    </span>
    <i class="smpt-close"></i>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    lv: {
      type: String,
      default: '4'
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
