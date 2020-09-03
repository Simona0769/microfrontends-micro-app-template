<template>
  <el-dialog class="im-dialog" :visible.sync="dialogVisible" :width="width" :modal="modal" @close="close">
    <div slot="title" class="dialog-title">
      <slot name="title">{{ title }}</slot>
    </div>
    <slot />
    <div v-if="hasFooter" slot="footer" class="dialog-footer">
      <slot name="footer">
        <el-button size="mini" @click="handleCancel">{{ cancelText }}</el-button>
        <el-button v-if="hasOk" type="primary" size="mini" @click="handleConfirm">{{ okText }}</el-button>
      </slot>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'ImDialog',
  props: {
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '50%'
    },
    hasFooter: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    okText: {
      type: String,
      default: '确定'
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    hasOk: {
      type: Boolean,
      default: true
    },
    modal:{
      type: Boolean,
      default: true
    },
    close: {
      type: Function,
      default: ()=> {}
    },
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  methods: {
    handleCancel() {
      this.$emit('cancel')
      this.$emit('update:visible', false)
    },
    handleConfirm() {
      this.$emit('confirm')
    }
    // beforeClose(done) {
    //   done()
    // }
  }
}
</script>
<style lang="scss">
.im-dialog {
  .el-dialog__header {
    padding: 16px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.09);
    .dialog-title {
      font-size: 16px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
    }
  }
  .el-dialog__body {
    padding: 20px;
  }
  .el-dialog__footer {
    padding: 10px 24px;
    border-top: 1px solid rgba(0, 0, 0, 0.09);
  }
}
</style>
