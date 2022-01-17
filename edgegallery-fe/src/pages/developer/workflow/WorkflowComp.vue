<template>
  <div class="workflow-comp-container">
    <div
      class="workflow-comp-item"
      v-for="(item,index) in workflowDataArray"
      :key="index"
      :class="item.class"
      @click="(currentFlow===1&&item.id===3)||item.id<=currentFlow||item.id===10||item.id>5?jumpTo(item):showWarning()"
    >
      <img
        :src="item.src"
        :alt="item.class"
        class="workflow-comp-item-img"
      >
      <div class="workflow-comp-item-name">
        {{ language==='cn'?item.name:item.nameEn }}
      </div>
      <div
        class="workflow-comp-item-step"
        :class="[item.id===currentFlow?'step-current':(item.id<currentFlow?'step-history':'step-future')]"
        v-if="item.id<5"
      >
        STEP{{ item.id }}
      </div>
    </div>
  </div>
</template>

<script>
import { atpTestApi } from '../../../api/developerApi.js'
export default {
  props: {
    currentFlow: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      language: localStorage.getItem('language') || 'cn',
      workflowDataArray: [
        {
          id: 1,
          name: '创建应用',
          nameEn: 'Application',
          class: 'app-application',
          src: require('../../../assets/images/application/app_application1.png'),
          toPath: '/EG/developer/createApplication'
        },
        {
          id: 10,
          name: '能力中心',
          nameEn: 'Services',
          class: 'capability-center',
          src: require('../../../assets/images/application/app_capability1.png'),
          toPath: '/EG/developer/capabilityCenter'
        },
        {
          id: 2,
          name: '选择沙箱',
          nameEn: 'Sandbox',
          class: 'app-sandbox',
          src: require('../../../assets/images/application/app_sandbox1.png'),
          toPath: '/EG/developer/sandbox'
        },
        {
          id: 3,
          name: '制作镜像',
          nameEn: 'Image',
          class: 'app-image',
          src: require('../../../assets/images/application/app_image1.png'),
          toPath: '/EG/images/appPackageBuild'
        },
        {
          id: 4,
          name: '测试认证',
          nameEn: 'Test',
          class: 'app-test',
          src: require('../../../assets/images/application/app_test1.png'),
          toPath: '/EG/developer/selectScenarios'
        },
        {
          id: 6,
          name: '应用仓库',
          nameEn: 'App Store',
          class: 'app-store',
          src: require('../../../assets/images/application/app_store1.png'),
          toPath: '/EG/appstore/appWarehouse'
        },
        {
          id: 7,
          name: 'MEAO',
          nameEn: 'MEAO',
          class: 'deploy-meao',
          src: require('../../../assets/images/application/app_meao1.png'),
          toPath: '/EG/mecm/appDeployDetail'
        },
        {
          id: 8,
          name: 'MEPM',
          nameEn: 'MEPM',
          class: 'deploy-mepm',
          src: require('../../../assets/images/application/app_mepm1.png'),
          toPath: ''
        },
        {
          id: 9,
          name: '边缘节点',
          nameEn: 'Nodes',
          class: 'deploy-node',
          src: require('../../../assets/images/application/app_node1.png'),
          toPath: ''
        }
      ]
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  },
  methods: {
    jumpTo (item) {
      if (item.toPath === '/EG/developer/createApplication' && this.currentFlow === '0') {
        sessionStorage.setItem('isCreate', '0')
        if (sessionStorage.getItem('userAuthorities').indexOf('ROLE_DEVELOPER_GUEST') < 0) {
          this.$router.push('/EG/developer/createApplication')
        } else {
          this.$message.warning(this.$t('promptInformation.noPermission'))
        }
      } else if (item.toPath === '/EG/developer/selectScenarios') {
        this.$store.commit('changeZoom', '1')
        atpTestApi.getTestId(sessionStorage.getItem('applicationId')).then(res => {
          if (res.data[0].status === 'running' || res.data[0].status === 'success' || res.data[0].status === 'failed') {
            this.$router.push('/EG/developer/testProcess')
          } else {
            this.$router.push(item.toPath)
          }
        }).catch(err => {
          console.log(err)
          this.$router.push(item.toPath)
        })
      } else {
        this.$store.commit('changeZoom', '1')
        this.$router.push(item.toPath)
      }
    },
    showWarning () {
      this.$message.warning(this.$t('workflow.mustSteps'))
    }
  },
  mounted () {

  }
}
</script>

<style lang="less" scoped>
  .workflow-comp-container{
    display: flex;
    justify-content: flex-start;
    position: relative;
    .workflow-comp-item{
      height: 120px;
      width: 120px;
      position: relative;
      text-align: center;
      cursor: pointer;
      .workflow-comp-item-img{
        width: 80px;
      }
      .workflow-comp-item-name{
        font-size: 24px;
      }
      .workflow-comp-item-step{
        border: 1px solid #ddd;
        width: 85px;
        margin: 0 auto;
        height: 30px;
        line-height: 30px;
      }
      .step-history{
        border: 1px solid #35ffd2;
        background: rgba(53,255,210,0.25);
        color: #23fff2;
      }
      .step-current{
        border: 1px solid #f2b720;
        background: rgba(242,183,32,0.25);
        color: #f2b720;
      }
      .step-future{
        border: 1px solid #bcbcbc;
        background: rgba(188,188,188,0.25);
        color: #b9b9b9;
      }
    }
    .capability-center{
      left: 240px;
      top: 0px;
    }
    .app-application{
      left: 230px;
      top: 55px;
    }
    .app-image{
      left: 105px;
      top: 105px;
    }
    .app-test{
      left: 100px;
      top: 60px;
    }
    .app-sandbox{
      left: 115px;
      top: 105px;
    }
    .app-store{
      top: 85px;
      left: 195px;
    }
    .deploy-meao{
      top: 140px;
      left: 320px;
    }
    .deploy-mepm{
      top: 150px;
      left: 325px;
    }
    .deploy-node{
      top: 145px;
      left: 320px;
    }
  }
</style>>
