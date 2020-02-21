<template>
  <div class="test" v-loading="loading">
    <img src="../../assets/images/build_test_test.png" alt="">
    <span class="testText">
      <b v-if="deployStatus === 'ONLINE'">{{$t('workspace.buildTip')}}</b>
      <b v-else>{{testLog}}</b>
    </span>
    <p></p>
    <el-button id="testBtn" type="primary" class="testButton" @click="goTest" v-if="deployStatus === 'ONLINE'">
      <b>{{testHref}}</b>
      <i class="el-icon-document-copy el-icon--right"></i>
    </el-button>
  </div>
</template>

<script>
import { Get } from '../../tools/tool.js'

export default {
  name: 'test',
  props: {
    projectBeforeConfig: {
      default: {}
    }
  },
  data () {
    return {
      deployStatus: '',
      testHref: '',
      testLog: '',
      deployInfo: '',
      timer: null,
      loading: false
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
      let url = 'mec/developer/v1/projects/' + projectId
      Get(url).then(res => {
        this.deployStatus = res.data.status
        if (res.data.status !== 'DEPLOYING') {
          this.clearInterval()
          this.getTestUrl()
        }
      })
    },
    clearInterval () {
      clearInterval(this.timer)
    },
    goTest () {
      window.open(this.testHref)
    }
  },
  mounted () {
    this.getDeployStatus()
    this.timer = setInterval(() => {
      this.getDeployStatus()
    }, 10000)
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
