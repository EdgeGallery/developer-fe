<template>
  <div class="uploadOPenapiDialog">
    <el-dialog
      :title="$t('workspace.publish')"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-checkbox
        id="publishtext"
        v-model="isPublish"
      >
        {{ $t('workspace.publishtext') }}
      </el-checkbox>
      <el-checkbox
        id="publictext"
        v-model="isPublic"
      >
        {{ $t('workspace.publictext') }}
      </el-checkbox>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          id="cancelBtn"
          @click="handleClose"
        >{{ $t('common.cancel') }}</el-button>
        <el-button
          id="confirmBtn"
          type="primary"
          @click="confirmPublish"
        >{{ $t('common.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Post } from '../../../tools/tool.js'

export default {
  props: ['value'],
  data () {
    return {
      dialogVisible: this.value,
      isPublish: true,
      isPublic: false,
      userId: sessionStorage.getItem('userId')
    }
  },
  watch: {
    value (val) {
      console.log(val)
    }
  },
  methods: {
    handleClose () {
      this.$emit('input', false)
    },
    confirmPublish () {
      this.handleClose()
      let projectId = sessionStorage.getItem('mecDetailID')
      if (this.checked1) {
        let url = 'mec/developer/v1/projects/' + projectId + '/action/upload?userId=' + this.userId
        Post(url).then(res => {
        })
      }
      if (this.checked2) {
        let url = 'mec/developer/v1/projects/' + projectId + '/action/open-api?userId=' + this.userId
        Post(url)
      }
      this.$router.push({
        name: 'workspace'
      })
    }
  },
  mounted () {
  }
}

</script>
<style lang='less' scoped>
.uploadOPenapiDialog{
.el-dialog__body {
    padding-top: 30px !important;
    .el-checkbox {
      display: block;
      width: 80%;
      padding: 20px 10% 0;
    }
  }
}

</style>
