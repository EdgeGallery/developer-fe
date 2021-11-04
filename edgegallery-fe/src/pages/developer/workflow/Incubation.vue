<template>
  <div
    class="incubation common-workflow"
    :class="currentFlow===0?'':'common-center-active'"
  >
    <div>
      <div
        class="common-center"
      >
        <span
          class="common-workflow-item capability-center"
          :class="currentFlow>2||currentFlow===2?'capability-center-active':(currentFlow===1?'animation':'')"
          @click="jumpTo('/EG/developer/capabilityCenter')"
        />
        <span
          class="capability-active"
          v-if="currentFlow===2"
        />
      </div>
      <div>
        <div
          class="common-center"
        >
          <span
            class="common-workflow-item app-application"
            :class="currentFlow>1||currentFlow===1?'app-application-active':(currentFlow===0?'animation':'')"
            @click="jumpTo('/EG/developer/createApplication')"
          />
          <span
            class="application-active"
            v-if="currentFlow===1"
          />
        </div>
        <div
          class="common-center"
        >
          <span
            class="common-workflow-item app-image"
            :class="currentFlow>4||currentFlow===4?'app-image-active':(currentFlow===3?'animation':'')"
            @click="jumpTo('/EG/images/appPackageBuild')"
          />
          <span
            class="image-active"
            v-if="currentFlow===4"
          />
        </div>
        <div
          class="common-center"
        >
          <span
            class="common-workflow-item app-test"
            :class="currentFlow>5||currentFlow===5?'app-test-active':(currentFlow===4?'animation':'')"
            @click="jumpTo('/EG/developer/selectScenarios')"
          />
          <span
            class="test-active"
            v-if="currentFlow===5"
          />
        </div>
      </div>
      <div>
        <div
          class="common-center"
        >
          <span
            class="common-workflow-item app-sandbox"
            :class="currentFlow>3||currentFlow===3?'app-sandbox-active':(currentFlow===1||currentFlow===2?'animation':'')"
            @click="jumpTo('/EG/developer/sandbox')"
          />
          <span
            class="sandbox-active"
            v-if="currentFlow===3"
          />
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
  data () {
    return {
      isOnProgress: false,
      isApplicationActive: false,
      isSandboxActive: false,
      isTestActive: false,
      currentFlow: 0

    }
  },
  methods: {
    jumpTo (path) {
      this.$router.push(path)
    }
  },
  mounted () {
    this.currentFlow = sessionStorage.getItem('currentFlow') ? Number(sessionStorage.getItem('currentFlow')) : 0
  }
}
</script>

<style lang="less" scoped>
.incubation{
  .capability-center{
    left: 155px;
    top: 30px;
    background: url("../../../assets/images/application/app_capability_center.png") no-repeat center;
    background-size: contain;
  }
  .common-center>.capability-center::after{
    width: 0;
  }
  .common-center>.capability-active{
    display: inline-block;
    height: 30px;
    width: 30px;
    background: url("../../../assets/images/application/app_mark_box2.png") no-repeat center;
    background-size: contain;
    position: absolute;
    top: 105px;
    left: 205px;
  }
  .app-application{
    left: 30px;
    top: 70px;
    background: url("../../../assets/images/application/app_application.png") no-repeat center;
    background-size: contain;
  }
  .common-center>.application-active{
    display: inline-block;
    height: 30px;
    width: 30px;
    background: url("../../../assets/images/application/app_mark_box1.png") no-repeat center;
    background-size: contain;
    position: absolute;
    top: 235px;
    left: 80px;
  }
  .app-image{
    left: 335px;
    top: -20px;
    background: url("../../../assets/images/application/app_image.png") no-repeat center;
    background-size: contain;
  }
  .common-center>.image-active{
    display: inline-block;
    height: 30px;
    width: 30px;
    background: url("../../../assets/images/application/app_mark_box2.png") no-repeat center;
    background-size: contain;
    position: absolute;
    top: 235px;
    left: 385px;
  }
  .app-test{
    left: 495px;
    top: -110px;
    background: url("../../../assets/images/application/app_test.png") no-repeat center;
    background-size: contain;
  }
  .common-center>.test-active{
    display: inline-block;
    height: 30px;
    width: 30px;
    background: url("../../../assets/images/application/app_mark_box2.png") no-repeat center;
    background-size: contain;
    position: absolute;
    top: 235px;
    left: 545px;
  }
  .app-sandbox{
    left: 195px;
    top: -80px;
    background: url("../../../assets/images/application/app_sandbox.png") no-repeat center;
    background-size: contain;
  }
  .common-center>.sandbox-active{
    display: inline-block;
    height: 30px;
    width: 30px;
    background: url("../../../assets/images/application/app_mark_box2.png") no-repeat center;
    background-size: contain;
    position: absolute;
    top: 355px;
    left: 245px;
  }
  .capability-center-active{
    background: url("../../../assets/images/application/app_capability_active.png") no-repeat center;
    background-size: contain;
  }
  .common-center{
    .app-application-active{
      background: url("../../../assets/images/application/app_application_active.png") no-repeat center;
      background-size: contain;
    }
    .app-image-active{
      background: url("../../../assets/images/application/app_image_active.png") no-repeat center;
      background-size: contain;
    }
    .app-test-active{
      background: url("../../../assets/images/application/app_test_active.png") no-repeat center;
      background-size: contain;
    }
    .app-sandbox-active{
      background: url("../../../assets/images/application/app_sandbox_active.png") no-repeat center;
      background-size: contain;
    }
  }
}
</style>
