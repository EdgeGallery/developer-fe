<template>
  <div
    class="incubation workflow"
    :class="currentFlow===0?'':'center-active'"
  >
    <div class="workflow-name">
      {{ $t('workflow.incubation') }}
    </div>
    <div
      v-for="(item,index) in workflowDataArray"
      :key="index"
    >
      <div
        class="center"
      >
        <div
          class="step-item"
          :class="[item.id===currentFlow?'item-active':(item.id<currentFlow?'item-history':''),item.class]"
          @click="(currentFlow===1&&item.id===3)||item.id===currentFlow+1||item.id<currentFlow||item.id===currentFlow||item.id===10?jumpTo(item):showWarning()"
        >
          <div
            class="steps-num"
            v-if="item.id!==10"
          >
            {{ 'Step'+item.id }}
          </div>
          <img
            :src="item.src"
            :class="[currentFlow>item.id?'active':'']"
            alt="EdgeGallery"
          >
          <div class="flow-name">
            {{ language==='cn'?item.name:item.nameEn }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { atpTestApi } from '../../../api/developerApi.js'
export default {
  name: 'Incubation',
  components: {

  },
  props: {
    currentFlow: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      isCapabilityActive: false,
      workflowDataArray: [
        {
          id: 1,
          name: '创建应用',
          nameEn: 'Application',
          class: 'app-application',
          src: require('../../../assets/images/application/app_application.png'),
          toPath: '/EG/developer/createApplication'
        },
        {
          id: 10,
          name: '能力中心',
          nameEn: 'Services',
          class: 'capability-center',
          src: require('../../../assets/images/application/app_capability.png'),
          toPath: '/EG/developer/capabilityCenter'
        },
        {
          id: 2,
          name: '选择沙箱',
          nameEn: 'Sandbox',
          class: 'app-sandbox',
          src: require('../../../assets/images/application/app_sandbox.png'),
          toPath: '/EG/developer/sandbox'
        },
        {
          id: 3,
          name: '制作镜像',
          nameEn: 'Image',
          class: 'app-image',
          src: require('../../../assets/images/application/app_image.png'),
          toPath: '/EG/images/appPackageBuild'
        },
        {
          id: 4,
          name: '测试认证',
          nameEn: 'Test',
          class: 'app-test',
          src: require('../../../assets/images/application/app_test.png'),
          toPath: '/EG/developer/selectScenarios'
        }
      ],
      language: localStorage.getItem('language') || 'cn'
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
        this.$router.push(item.toPath)
      }
    },
    showWarning () {
      this.$message.warning(this.$t('workflow.mustSteps'))
    }
  }
}
</script>

<style lang="less" scoped>
.incubation{
  .workflow-name{
    left: -220px;
  }
  .capability-center{
    left: 260px;
    top: -75px;
  }
  .app-application{
    left: 55px;
    top: 250px;
    .flow-name{
      top: 60px;
    }
  }
  .app-image{
    left: 550px;
    top: -170px;
    .flow-name{
      top: 60px;
    }
  }
  .app-test{
    left: 765px;
    top: -310px;
    .flow-name{
      top: 60px;
    }
  }
  .app-sandbox{
    left: 345px;
    top: 165px;
    .flow-name{
      top: 60px;
    }
  }
}
</style>
