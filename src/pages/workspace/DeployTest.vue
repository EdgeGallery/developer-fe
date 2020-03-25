<template>
  <div
    class="test"
    v-loading="loading"
  >
    <img
      src="../../assets/images/build_test_test.png"
      alt=""
    >
    <span class="testText">
      <b v-if="deployStatus === 'DEPLOYED'">{{ $t('workspace.buildTip') }}</b>
      <b v-else>{{ testLog }}</b>
    </span>
    <p />
    <el-button
      id="testBtn"
      type="primary"
      class="testButton"
      @click="goTest"
      v-if="deployStatus === 'DEPLOYED'"
    >
      <b>{{ testHref }}</b>
      <i class="el-icon-document-copy el-icon--right" />
    </el-button>
  </div>
</template>

<script>
import { Get } from '../../tools/tool.js'

export default {
  name: 'Test',
  props: {
    projectBeforeConfig: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      deployStatus: '',
      testHref: '',
      testLog: '',
      deployInfo: '',
      timer: null,
      loading: true,
      userId: sessionStorage.getItem('userId')
    }
  },
  methods: {
    emitStepData () {
      let ifNext = true
      this.$emit('getStepData', { step: 'fourth', data: '', ifNext })
    },
    getTestUrl () {
      let projectId = sessionStorage.getItem('mecDetailID')
      let url = 'mec/developer/v1/projects/' + projectId + '/test-config'
      Get(url).then(res => {
        this.testHref = res.data.accessURL
        this.testLog = res.data.errorLog
        this.loading = false
      })
    },
    getDeployStatus () {
      let projectId = sessionStorage.getItem('mecDetailID')
      let url = 'mec/developer/v1/projects/' + projectId + '?userId=' + this.userId
      Get(url).then(res => {
        this.deployStatus = res.data.status
        if (res.data.status === 'DEPLOYING') {
          this.$emit('getBtnStatus', { status: true, deploy: false, isCompleted: true })
        } else if (res.data.status === 'DEPLOYED') {
          this.$emit('getBtnStatus', { status: false, deploy: true, isCompleted: false })
          this.getTestUrl()
          this.clearInterval()
        } else {
          this.$emit('getBtnStatus', { status: false, deploy: true, isCompleted: true })
          this.getTestUrl()
          this.clearInterval()
        }
      })
    },
    clearInterval () {
      clearTimeout(this.timer)
      this.timer = null
    },
    goTest () {
      window.open(this.testHref)
    }
  },
  mounted () {
    setTimeout(this.getDeployStatus, 5000)
    // this.getDeployStatus()
    this.timer = setInterval(() => {
      this.getDeployStatus()
    }, 5000)
  },
  beforeDestroy () {
    this.clearInterval()
  }
}
</script>

<style lang='less'>
.test {
  text-align: center;
  img{
    display: block;
    margin: 0 auto;
  }
  .testText {
    display: inline-block;
    margin-top: 30px;
  }
  .testButton {
    margin-top: 30px;
  }
}
</style>
