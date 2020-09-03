<template>
  <div class="app-page-container">
    <im-search-pad :has-expand="false" border-bottom>
      <im-search-pad-item prop="title" label="通知通告">
        <el-input size="mini" placeholder="请输入通知通告" />
      </im-search-pad-item>
      <im-search-pad-item prop="title" label="发布者">
        <el-input size="mini" placeholder="请输入发布者" />
      </im-search-pad-item>
      <im-search-pad-item prop="title" label="发布者">
        <el-date-picker
          v-model="formData.date"
          type="daterange"
          size="mini"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </im-search-pad-item>
    </im-search-pad>
    <im-tool-bar>
      <div slot="left">
        <el-button type="primary"> 新增通告 </el-button>
        <el-button size="mini"> 删除 </el-button>
      </div>
    </im-tool-bar>

    <im-table-page :remote-method="getTableData" :data="[]">
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column prop="merchantCode" width="80" show-overflow-tooltip fixed="left" label="编号" />
      <el-table-column prop="merchantNm" show-overflow-tooltip label="标题" />
      <el-table-column prop="ceoName" show-overflow-tooltip label="通知通告内容" />
      <el-table-column prop="ceoMobile" show-overflow-tooltip label="发布者" />
      <el-table-column prop="ceoMobile" show-overflow-tooltip label="发布时间" />
      <el-table-column prop="ceoMobile" show-overflow-tooltip label="操作">

        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleBuyersChoose(scope.row)">选择</el-button>
        </template>
      </el-table-column>
    </im-table-page>

    <el-dialog :visible.sync="showAddModal" title="新增通告">
      <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
        <el-form-item label="通告标题" prop="title">
          <el-input v-model="formData.title" placeholder="请输入通告标题" clearable :style="{width: '100%'}" />
        </el-form-item>
        <el-form-item label="通告内容" prop="content">
          <el-input
            v-model="formData.content"
            type="textarea"
            placeholder="请输入通告内容"
            :autosize="{minRows: 4, maxRows: 4}"
            :style="{width: '100%'}"
          />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="showAddModal=false">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
import { getNotification } from '@/api/notification'
import { mapState } from 'vuex'

export default {
  name: 'Notification',
  data() {
    return {
      formData: {
        title: undefined,
        content: undefined,
        date: []
      },
      rules: {
        title: [{
          required: true,
          message: '请输入通告标题',
          trigger: 'blur'
        }],
        content: [{
          required: true,
          message: '请输入通告内容',
          trigger: 'blur'
        }]
      },
      showAddModal: false
    }
  },
  computed: {
    ...mapState('user', [
      'name'
    ])
  },
  created() {
    console.log(this.name)
  },

  methods: {
    getTableData() {
      return getNotification()
    },
    handelConfirm() {

    }
  }

}
</script>

<style scoped>

</style>
