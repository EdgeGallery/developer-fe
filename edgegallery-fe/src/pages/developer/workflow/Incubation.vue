<template>
  <div
    class="incubation workflow"
    :class="currentFlow===0?'':'center-active'"
  >
    <div
      v-for="(item,index) in workflowDataArray"
      :key="index"
    >
      <div
        class="center"
      >
        <div
          class="item"
          :class="[item.id===currentFlow&&isCapabilityActive?'item-capa-active':(item.id===currentFlow?'item-active':''),currentFlow>0&&item.id!==2?'item-must':'',item.class]"
          @click="item.id<=currentFlow+1?jumpTo(item):showWarning()"
        >
          <img
            :src="item.src"
            :class="[currentFlow>item.id||currentFlow===item.id?'active':'',item.id===currentFlow+1?'next':'']"
            alt="EdgeGallery"
          >
          <div class="flow-name">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
          class: 'app-application',
          src: require('../../../assets/images/application/app_application.png'),
          toPath: '/EG/developer/createApplication'
        },
        {
          id: 2,
          name: '能力中心',
          class: 'capability-center',
          src: require('../../../assets/images/application/app_capability.png'),
          toPath: '/EG/developer/capabilityCenter'
        },
        {
          id: 3,
          name: '沙箱',
          class: 'app-sandbox',
          src: require('../../../assets/images/application/app_sandbox.png'),
          toPath: '/EG/developer/sandbox'
        },
        {
          id: 4,
          name: '镜像',
          class: 'app-image',
          src: require('../../../assets/images/application/app_image.png'),
          toPath: '/EG/images/appPackageBuild'
        },
        {
          id: 5,
          name: '测试',
          class: 'app-test',
          src: require('../../../assets/images/application/app_test.png'),
          toPath: '/EG/developer/selectScenarios'
        }
      ]
    }
  },
  methods: {
    jumpTo (item) {
      if (item.toPath === '/EG/developer/createApplication' && this.currentFlow === 0) {
        sessionStorage.setItem('isCreate', '0')
      }
      this.$router.push(item.toPath)
    },
    showWarning () {
      this.$message.warning('请先完成前面的步骤！')
    }
  },
  mounted () {

  }
}
</script>

<style lang="less" scoped>
.incubation{
  .capability-center{
    left: 155px;
    top: -145px;
  }
  .app-application{
    left: 20px;
    top: 130px;
  }
  .app-image{
    left: 330px;
    top: -260px;
  }
  .app-test{
    left: 500px;
    top: -390px;
  }
  .app-sandbox{
    left: 190px;
    top: 15px;
  }
}
</style>
