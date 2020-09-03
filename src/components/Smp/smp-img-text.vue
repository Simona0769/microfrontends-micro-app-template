<template>
  <div class="smp-img-text">
    <div class="smpit-item" v-for="(item,index) in listData" :key="index">
      <div class="smpiti-l">
        <img :src="item.imgUrl">
      </div>
      <div class="smpiti-r">
        <span class="smpiti-r-textbox">
          <em>事件类型：</em>
          <strong>【{{item.type}}】</strong>
        </span>
        <span class="smpiti-r-textbox">
          <em>时间：</em>
          {{item.time}}
        </span>
        <span class="smpiti-r-textbox">
          <em>地点：</em>
          {{item.address}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
// props:
// list_data{
//   type
//   title
//   time
// }
// titleName:['type','title','time']
export default {
  data () {
    return {

    }
  },
  props: {
    listData: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {

  }
}
</script>

<style lang="scss">
.smp-img-text{
  // padding: 0!important;
}
</style>
