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
          class="item"
          :class="[item.id===currentFlow?'item-active':'',currentFlow>0&&item.id!==2?'item-must':'',item.class]"
          @click="(currentFlow===1&&item.id===3)||item.id===currentFlow+1||item.id<currentFlow||item.id===currentFlow?jumpTo(item):showWarning()"
        >
          <img
            :src="item.src"
            :class="[currentFlow>item.id||currentFlow===item.id?'active':'',(currentFlow===1&&item.id===3)||item.id===currentFlow+1?'next':'']"
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
          name: '应用',
          nameEn: 'Application',
          class: 'app-application',
          src: require('../../../assets/images/application/app_application.png'),
          toPath: '/EG/developer/createApplication'
        },
        {
          id: 2,
          name: '能力中心',
          nameEn: 'Services',
          class: 'capability-center',
          src: require('../../../assets/images/application/app_capability.png'),
          toPath: '/EG/developer/capabilityCenter'
        },
        {
          id: 3,
          name: '沙箱',
          nameEn: 'Sandbox',
          class: 'app-sandbox',
          src: require('../../../assets/images/application/app_sandbox.png'),
          toPath: '/EG/developer/sandbox'
        },
        {
          id: 4,
          name: '镜像',
          nameEn: 'Image',
          class: 'app-image',
          src: require('../../../assets/images/application/app_image.png'),
          toPath: '/EG/images/appPackageBuild'
        },
        {
          id: 5,
          name: '测试',
          nameEn: 'Test',
          class: 'app-test',
          src: require('../../../assets/images/application/app_test.png'),
          toPath: '/EG/developer/selectScenarios'
        }
      ],
      language: localStorage.getItem('language')
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
      } else if (item.toPath === '/EG/developer/selectScenarios' && this.currentFlow >= 5) {
        atpTestApi.getTestId(sessionStorage.getItem('applicationId')).then(res => {
          if (res.data[0].status === 'running' || res.data[0].status === 'success' || res.data[0].status === 'failed') {
            item.toPath = '/EG/developer/testProcess'
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
  },
  mounted () {

  }
}
</script>

<style lang="less" scoped>
.incubation{
  .workflow-name{
    top: -35px;
    left: -110px;
  }
  .capability-center{
    left: 155px;
    top: -130px;
  }
  .app-application{
    left: 20px;
    top: 135px;
  }
  .app-image{
    left: 330px;
    top: -205px;
  }
  .app-test{
    left: 505px;
    top: -315px;
  }
  .app-sandbox{
    left: 190px;
    top: 50px;
  }
}
</style>
