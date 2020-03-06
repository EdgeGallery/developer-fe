<template>
  <div class="workdetail">
    <el-breadcrumb separator="/" class="bread-crumb">
      <el-breadcrumb-item :to="{ path: '/mecDeveloper' }">{{$t('breadCrumb.mecDeveloper')}}</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/mecDeveloper/work' }">{{$t('breadCrumb.workspace')}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{$t('breadCrumb.detail')}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tabs type="border-card" class="elTabs" v-model="activeName">
      <el-tab-pane :label="$t('workspace.api')" class="elTabPane" name="1" lazy>
       <api></api>
      </el-tab-pane>
      <el-tab-pane :label="$t('workspace.buildAndTest')" class="elTabPane" name="2" lazy>
        <el-steps :active="active" finish-status="success" align-center>
          <el-step :title="$t('workspace.selectImage')"></el-step>
          <el-step :title="$t('workspace.configureYaml')"></el-step>
          <el-step :title="$t('workspace.server')"></el-step>
          <el-step :title="$t('workspace.test')"></el-step>
        </el-steps>
        <div class="elSteps">
          <component
            v-bind:is="currentComponent"
            @getStepData='getStepData'
            :projectBeforeConfig='projectBeforeConfig'
            ref="currentComponet">
          </component>
        </div>
        <div class="elButton">
          <el-button id="prevBtn" type="text" @click="previous" v-if="active>0">
            <b>{{$t('workspace.previous')}}</b>
          </el-button>
          <el-button id="nextBtn" type="primary" @click="next">
            <b>{{btnName}}</b>
          </el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('workspace.statistics')" class="elTabPane" name="3" lazy>
        <dataStistical></dataStistical>
      </el-tab-pane>
      <el-tab-pane :label="$t('workspace.projectLink')" class="elTabPane" name="4" lazy>
        <projectLink></projectLink>
      </el-tab-pane>
      <el-tab-pane :label="$t('workspace.toolChain')" class="elTabPane" name="5" lazy>
        <toolChain v-if="!viewReport" @isViewReport="getViewReport"></toolChain>
        <toolReport v-else  @isViewReport="getViewReport"></toolReport>
      </el-tab-pane>
    </el-tabs>
    <div v-if="dialogVisible">
      <publishAppDialog v-model="dialogVisible"></publishAppDialog>
    </div>

  </div>
</template>

<script>
import { Get, Post, Put, urlPrefix } from '../../tools/tool.js'
import imageSelect from './ImageSelect'
import configYaml from './ConfigYaml'
import selectServer from './SelectServer'
import deployTest from './DeployTest'
import publishAppDialog from './detail/PublishAppDialog'
import api from './detail/Api'
import dataStistical from './detail/DataStatistical'
import projectLink from './detail/ProjectLink'
import toolChain from './detail/ToolChain'
import toolReport from './detail/ToolReport'
export default {
  name: 'appDetail',
  components: {
    imageSelect,
    configYaml,
    selectServer,
    deployTest,
    publishAppDialog,
    api,
    dataStistical,
    projectLink,
    toolChain,
    toolReport
  },
  data () {
    return {
      apiDataLoading: true,
      projecDetailList: [],
      dialogVisible: false,
      activeName: '1',
      active: 0,
      nextButtonName: this.$t('workspace.nextStep'),
      currentComponent: 'imageSelect',
      allStepData: {},
      projectBeforeConfig: {},
      viewReport: false
    }
  },
  computed: {
    btnName: function () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.nextButtonName = this.active === 3 ? this.$t('workspace.finishTest') : this.$t('workspace.nextStep')
      return this.nextButtonName
    }
  },
  methods: {
    changeComponent () {
      switch (this.active) {
        case 0:
          this.currentComponent = 'imageSelect'
          break
        case 1:
          this.currentComponent = 'configYaml'
          break
        case 2:
          this.currentComponent = 'selectServer'
          break
        case 3:
          this.currentComponent = 'deployTest'
          break
        default:
          this.currentComponent = 'imageSelect'
      }
    },
    next () {
      // 获取组件内部的值
      this.$refs.currentComponet.emitStepData()
      if (this.allStepData.ifNext) {
        this.active++
        this.handleStep()
      }
    },
    previous () {
      this.active--
      this.handleStep()
    },
    handleStep () {
      // 改变动态组件的值
      this.changeComponent()
      this.allStepData.ifNext = false
      if (this.active === 3) {
        // 第三部提交数据
        this.submitData()
      }
      if (this.active === 4) {
        this.dialogVisible = true
        // 清空测试环境
        this.cleanTestEnv()
      }
    },
    handleClose () {
      this.$router.push({
        name: 'workspace'
      })
    },
    handleNodeClick (data) {
      if (!data.children) {
        let apiUrl = urlPrefix + 'mec/developer/v1/files/' + data.apiFileId
        this.apiHtml = 'http://159.138.146.235:8080/swagger#' + apiUrl
      }
    },
    getStepData (data) {
      this.allStepData[data.step] = data.data
      this.allStepData.ifNext = data.ifNext
    },
    submitData () {
      let projectId = sessionStorage.getItem('mecDetailID')
      let url = 'mec/developer/v1/projects/' + projectId + '/test-config'
      let getParams = (type) => {
        let params = []
        if (type === 'image') {
          this.allStepData.second.appImage.forEach(item => {
            params.push(item.id)
          })
        } else {
          params.push(this.allStepData.third)
        }
        return params
      }
      let params = {
        // 第一步的apifileID
        appApiFileId: this.allStepData.first.appApiFileId,
        // 第二步填入的服务连接端口号
        agentConfig: {
          serviceName: this.allStepData.second.serviceName,
          href: this.allStepData.second.serviceHref,
          port: Number(this.allStepData.second.servicePort)
        },
        // 第一二步上传，选择的image
        imageFileIds: getParams('image'),
        // 第三步选择的服务
        hosts: getParams('host')

      }
      // 根据第一步的状态判断是新建还是修改
      let requireMethod = Post
      if (this.projectBeforeConfig.testId) {
        requireMethod = Put
        // 修改需要
        params.status = this.projectBeforeConfig.status
        params.accessURL = this.projectBeforeConfig.accessURL
        params.errorLog = this.projectBeforeConfig.errorLog
      }
      requireMethod(url, params, 'neworedit').then(res => {
        // 部署
        let deployUrl = 'mec/developer/v1/projects/' + projectId + '/action/deploy'
        Post(deployUrl).then(res => {
          this.$message({
            message: '已经开始部署。',
            type: 'success'
          })
        })
      })
    },
    cleanTestEnv () {
      let projectId = sessionStorage.getItem('mecDetailID')
      let url = 'mec/developer/v1/projects/' + projectId + '/action/clean'
      Post(url).then(res => {
      })
    },
    getViewReport (data) {
      this.viewReport = data
    }
  },
  mounted () {
    this.handleStep()
    // 获取以前提交过的config
    let projectId = sessionStorage.getItem('mecDetailID')
    let url = 'mec/developer/v1/projects/' + projectId + '/test-config'
    Get(url).then(res => {
      this.projectBeforeConfig = res.data
      // if (this.projectBeforeConfig.testId) {
      //   this.active = 3
      // }
    })
  }
}
</script>

<style lang="less">
.el-steps{
  margin-bottom: 40px;
  .el-step__icon-inner{
    width: 8px;
    height: 8px;
    background-color: #fff;
    text-indent: 99px;
    border-radius: 50%;
    overflow: hidden;
  }
  .el-step__icon.is-text{
    border: none;
  }
  .el-step__head.is-success .el-step__line{
    background-color: #6b92fa;
  }
  .el-step__head.is-success{
    border-color: #6b92fa;
  }
  .el-step__title.is-success{
    color: #303133;
  }
  .el-step__head.is-wait .el-step__icon.is-text{
    width: 24px;
    height: 24px;
    background-color: #b8becc;
    border-radius: 50%;
  }
  .el-step__head.is-process .el-step__icon.is-text,.el-step__head.is-success .el-step__icon.is-text{
    width: 24px;
    height: 24px;
    background-color: #6b92fa;
    border-radius: 50%;
  }
  .el-step__head.is-success .el-step__icon-inner{
    width: 16px;
    height: 16px;
    background: url('../../assets/images/step_success.png') no-repeat;
    background-size: cover;
  }
}
.upload-demo{
  .el-button--primary{
    background-color: #fff;
    border-color: #688ef3;
    color: #688ef3;
    padding: 6px 20px;
    margin-top: 8px;
  }
  .el-icon-warning{
    color: #688ef3;
    margin-right: 5px;
    font-size: 14px;
  }
  .el-upload__tip{
    margin-top: 10px;
  }
}
.workdetail {
  height: 100%;
  .el-tree-node__content{
    height: 35px;
    line-height: 35px;
  }
  .elTabs {
    .elTabPane {
      padding: 30px;
      min-height: 300px;
    }
    .iframe {
      height: 100%;
    }
    .iframe iframe {
      width: 100%;
    }
    .elButton {
      width: 80%;
      margin: 15px 10% 0;
      text-align: right;
      button {
        height: 30px;
        width: 110px;
        line-height: 30px;
        padding: 0;
      }
      .el-button--text {
        border: 1px solid #688ef3;
      }
      .el-button--primary {
        background-color: #688ef3;
        color: #fff;
      }
    }
    .elSteps {
      margin: 50px 10% 0;
      // height: 400px;
      width: 80%;
      background-color: #fafafa;
      border-radius: 8px;
      padding: 40px;
      box-sizing: border-box;
    }
    .elDatePicker {
      margin-top: 20px;
    }
    .elProgress {
      text-align: center;
      margin-top: 20px;
    }
    // .el-tree{
    //   .el-tree-node.is-current span{
    //     color: #688ef3;
    //   }
    // }
  }

}
</style>
