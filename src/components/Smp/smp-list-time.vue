<template>
  <ul class="smp-list-time">
    <li v-for="(item,index) in listData" :key="index">
      <div class="smpl-l">
        <span>【{{item.type}}】</span>
        <div>{{item.title}}</div>
      </div>
      <div class="smpl-r">
        {{item.time}}
      </div>
    </li>
  </ul>
</template>

<script>
// props
// list_data{
//   type
//   title
//   time
// }
export default {
  props: {
    listData: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      // listData: [
      //   {
      //     type: '人员',
      //     title: '张三可疑行为',
      //     time: '2020-05-01'
      //   }
      // ]
    }
  },
  methods: {

  }
}
</script>

<style lang="scss">
.smp-list-time{
  // padding: 0!important;
}
</style>
