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
          name: '',
          class: 'app-application',
          src: require('../../../assets/images/application/app_application.png'),
          toPath: '/EG/developer/createApplication'
        },
        {
          id: 2,
          name: '',
          class: 'capability-center',
          src: require('../../../assets/images/application/app_capability.png'),
          toPath: '/EG/developer/capabilityCenter'
        },
        {
          id: 3,
          name: '',
          class: 'app-sandbox',
          src: require('../../../assets/images/application/app_sandbox.png'),
          toPath: '/EG/developer/sandbox'
        },
        {
          id: 4,
          name: '',
          class: 'app-image',
          src: require('../../../assets/images/application/app_image.png'),
          toPath: '/EG/images/appPackageBuild'
        },
        {
          id: 5,
          name: '',
          class: 'app-test',
          src: require('../../../assets/images/application/app_test.png'),
          toPath: '/EG/developer/selectScenarios'
        }
      ]
    }
  },
  methods: {
    jumpTo (item) {
      if (item.path === '/EG/developer/createApplication') {
        if (item.id > this.currentFlow + 1) {
          sessionStorage.setItem('isCreate', false)
        }
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
    top: -70px;
  }
  .app-application{
    left: 25px;
    top: 150px;
  }
  .app-image{
    left: 335px;
    top: -120px;
  }
  .app-test{
    left: 495px;
    top: -210px;
  }
  .app-sandbox{
    left: 195px;
    top: 95px;
  }
}
</style>
